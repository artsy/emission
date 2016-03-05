#import "ARCollectionViewMasonryLayout.h"
#import "_ARCollectionViewMasonryAttributesGrid.h"

NSString *const ARCollectionElementKindSectionStickyHeader = @"ARCollectionElementKindSectionStickyHeader";


@interface ARCollectionViewMasonryLayout()
@property (nonatomic, assign) enum ARCollectionViewMasonryLayoutDirection direction;

@property (nonatomic, assign) NSInteger itemCount;

@property (nonatomic, assign) BOOL stickyHeaderIsScrolling;

@property (nonatomic, strong) UICollectionViewLayoutAttributes *headerAttributes;
@property (nonatomic, strong) UICollectionViewLayoutAttributes *footerAttributes;
@property (nonatomic, strong) UICollectionViewLayoutAttributes *stickyHeaderAttributes;

@property (nonatomic, strong) _ARCollectionViewMasonryAttributesGrid *attributesGrid;

@end

@implementation ARCollectionViewMasonryLayout

- (instancetype)initWithDirection:(enum ARCollectionViewMasonryLayoutDirection)direction
{
    self = [super init];
    if (!self) return nil;

    _direction = direction;
    _rank = 2;
    _dimensionLength = 120;
    _contentInset = UIEdgeInsetsZero;
    _itemMargins = CGSizeZero;

    return self;
}

#pragma mark - Custom Accessors that Invalidate layout

- (void)setRank:(NSUInteger)rank
{
    if (_rank != rank) {
        _rank = rank;
        [self invalidateLayout];
    }
}

- (void)setDimensionLength:(CGFloat)dimensionLength
{
    if (_dimensionLength != dimensionLength) {
        _dimensionLength = dimensionLength;
        [self invalidateLayout];
    }
}

- (void)setContentInset:(UIEdgeInsets)contentInset
{
    if (!UIEdgeInsetsEqualToEdgeInsets(_contentInset, contentInset)) {
        _contentInset = contentInset;
        [self invalidateLayout];
    }
}

- (void)setItemMargins:(CGSize)itemMargins
{
    if (!CGSizeEqualToSize(_itemMargins, itemMargins)) {
        _itemMargins = itemMargins;
        [self invalidateLayout];
    }
}

#pragma mark - Layout

- (void)prepareLayout
{
    [super prepareLayout];

    if ([self collectionView]) {

        NSAssert(self.delegate != nil, @"Delegate is nil, most likely because the collection view's delegate does not conform to ARCollectionViewMasonryLayoutDelegate.");

        // We need to pre-load the heights and the widths from the collectionview
        // and our delegate in order to pass these through to setupLayoutWithWidth

        NSInteger itemCount = [self.collectionView.dataSource collectionView:self.collectionView numberOfItemsInSection:0];

        NSMutableArray *variableDimensions = [NSMutableArray arrayWithCapacity:itemCount];
        CGFloat staticDimension = self.isHorizontal ? self.collectionView.frame.size.height : self.collectionView.frame.size.width;

        // Ask delegates for all the dimensions
        for (int i = 0; i < itemCount; i++) {
            NSIndexPath *indexPath = [NSIndexPath indexPathForItem:i inSection:0];

            CGFloat variableDimension = [self.delegate collectionView:self.collectionView
                                                               layout:self
                                  variableDimensionForItemAtIndexPath:indexPath];

            [variableDimensions addObject:@(variableDimension)];
        }

        [self setupLayoutWithStaticDimension:staticDimension andVariableDimensions:variableDimensions];
    }
}

- (id<ARCollectionViewMasonryLayoutDelegate>)delegate
{
    id<ARCollectionViewMasonryLayoutDelegate> delegate = nil;
    if ([self.collectionView.delegate conformsToProtocol:@protocol(ARCollectionViewMasonryLayoutDelegate)]) {
        delegate = (id<ARCollectionViewMasonryLayoutDelegate>)(self.collectionView.delegate);
    }
    return delegate;
}

- (CGFloat)longestDimensionWithLengths:(NSArray *)variableDimensions withOppositeDimension:(CGFloat)staticDimension;
{
    if ([self collectionView]) {
        [self setupLayoutWithStaticDimension:staticDimension andVariableDimensions:variableDimensions];
    }

    if (self.isHorizontal) {
        return  [self collectionViewContentSize].width;
    } else {
        return  [self collectionViewContentSize].height;
    }
}

- (void)setupLayoutWithStaticDimension:(CGFloat)staticDimension andVariableDimensions:(NSArray *)variableDimensions
{
    NSAssert(self.rank > 0, @"Rank for ARCollectionViewMasonryLayout should be greater than 0.");
    NSAssert(self.collectionView.numberOfSections == 1, @"ARCollectionViewmMasonry doesn't support multiple sections.");

    UICollectionViewFlowLayoutInvalidationContext *invalidationContext = [[UICollectionViewFlowLayoutInvalidationContext alloc] init];

    self.dimensionLength = ceilf(self.dimensionLength);
    self.itemCount = variableDimensions.count;
    CGFloat centeringOffset = [self generateCenteringOffsetWithMainDimension:staticDimension];

    BOOL isHorizontal = self.isHorizontal;
    BOOL hasContentInset = self.hasContentInset;

    CGFloat leadingInset = 0;
    CGFloat orthogonalInset = 0;

    if (isHorizontal) {
        if (hasContentInset) {
            leadingInset = self.contentInset.left;
            orthogonalInset = self.contentInset.top;
        } else {
            leadingInset = self.itemMargins.width;
            orthogonalInset = self.itemMargins.height;
        }
    } else {
        if (hasContentInset) {
            leadingInset = self.contentInset.top;
            orthogonalInset = self.contentInset.left;
        } else {
            leadingInset = self.itemMargins.height;
            orthogonalInset = self.itemMargins.width;
        }
    }

    // Add an optional header.
    NSIndexPath *indexPathZero = [NSIndexPath indexPathForItem:0 inSection:0];
    CGFloat headerDimension = [self headerDimensionAtIndexPath:indexPathZero];
    if (headerDimension != NSNotFound) {
        [self setupHeaderAtIndexPath:indexPathZero];
        leadingInset += headerDimension;
        [invalidationContext invalidateSupplementaryElementsOfKind:UICollectionElementKindSectionHeader atIndexPaths:@[indexPathZero]];
    }

    // Add an optional header, but this one can be sticky.
    CGFloat stickyHeaderDimension = [self stickyHeaderDimensionAtIndexPath:indexPathZero];
    if (stickyHeaderDimension != NSNotFound) {
        leadingInset += stickyHeaderDimension;

        [invalidationContext invalidateSupplementaryElementsOfKind:ARCollectionElementKindSectionStickyHeader atIndexPaths:@[indexPathZero]];
    }

    self.attributesGrid = [[_ARCollectionViewMasonryAttributesGrid alloc] initWithSectionCount:self.rank
                                                                                  isHorizontal:isHorizontal
                                                                                  leadingInset:leadingInset
                                                                               orthogonalInset:orthogonalInset
                                                                                mainItemMargin:self.mainItemMargin
                                                                           alternateItemMargin:self.alternateItemMargin
                                                                               centeringOffset:centeringOffset];

    [variableDimensions enumerateObjectsUsingBlock:^(NSNumber *dimension, NSUInteger index, BOOL *stop) {
        NSIndexPath *indexPath = [NSIndexPath indexPathForItem:index inSection:0];
        UICollectionViewLayoutAttributes *attributes = [UICollectionViewLayoutAttributes layoutAttributesForCellWithIndexPath:indexPath];

        CGFloat variableDimension = ceilf([dimension floatValue]);
        if (isHorizontal) {
            attributes.size = CGSizeMake(variableDimension, self.dimensionLength);
        } else {
            attributes.size = CGSizeMake(self.dimensionLength, variableDimension);
        }

        [self.attributesGrid addAttributes:attributes];
    }];

    [self.attributesGrid ensureTrailingItemsDoNotStickOut];

    // Add an optional footer.
    CGFloat footerLength = [self footerDimensionAtIndexPath:indexPathZero];
    if (footerLength != NSNotFound) {
        [self setupFooterAtIndexPath:indexPathZero];
        [invalidationContext invalidateSupplementaryElementsOfKind:UICollectionElementKindSectionFooter atIndexPaths:@[indexPathZero]];
    }

    [self invalidateLayoutWithContext:invalidationContext];
}

- (CGFloat)headerDimensionAtIndexPath:(NSIndexPath *)indexPath
{
    CGSize size = [self headerSizeAtIndexPath:indexPath];
    if (CGSizeEqualToSize(size, CGSizeZero)) { return NSNotFound; }

    if ([self isHorizontal]) {
        return size.width;
    } else {
        return size.height;
    }
}

- (CGFloat)stickyHeaderDimensionAtIndexPath:(NSIndexPath *)indexPath
{
    CGSize size = [self stickyHeaderSizeAtIndexPath:indexPath];
    if (CGSizeEqualToSize(size, CGSizeZero)) { return NSNotFound; }

    if ([self isHorizontal]) {
        return size.width;
    } else {
        return size.height;
    }
}

- (CGFloat)footerDimensionAtIndexPath:(NSIndexPath *)indexPath
{
    CGSize size = [self footerSizeAtIndexPath:indexPath];
    if (CGSizeEqualToSize(size, CGSizeZero)) { return NSNotFound; }

    if ([self isHorizontal]) {
        return size.width;
    } else {
        return size.height;
    }
}

- (CGSize)headerSizeAtIndexPath:(NSIndexPath *)indexPath
{
    id<ARCollectionViewMasonryLayoutDelegate> delegate = self.delegate;
    CGSize size = CGSizeZero;

    if (delegate && [delegate respondsToSelector:@selector(collectionView:layout:referenceSizeForHeaderInSection:)]) {
        size = [delegate collectionView:self.collectionView layout:self referenceSizeForHeaderInSection:indexPath.section];
    }

    return size;
}

- (CGSize)stickyHeaderSizeAtIndexPath:(NSIndexPath *)indexPath
{
    id<ARCollectionViewMasonryLayoutDelegate> delegate = self.delegate;
    CGSize size = CGSizeZero;

    if (delegate && [delegate respondsToSelector:@selector(collectionView:layout:referenceSizeForStickyHeaderInSection:)]) {
        size = [delegate collectionView:self.collectionView layout:self referenceSizeForStickyHeaderInSection:indexPath.section];
    }

    return size;
}

- (CGSize)footerSizeAtIndexPath:(NSIndexPath *)indexPath
{
    id<UICollectionViewDelegateFlowLayout> delegate = self.delegate;
    CGSize size = CGSizeZero;

    if (delegate && [delegate respondsToSelector:@selector(collectionView:layout:referenceSizeForFooterInSection:)]) {
        size = [delegate collectionView:self.collectionView layout:self referenceSizeForFooterInSection:indexPath.section];
    }

    return size;
}

- (void)setupHeaderAtIndexPath:(NSIndexPath *)indexPath
{
    UICollectionViewLayoutAttributes *attributes = [UICollectionViewLayoutAttributes layoutAttributesForSupplementaryViewOfKind:UICollectionElementKindSectionHeader withIndexPath:indexPath];

    CGSize size = [self headerSizeAtIndexPath:indexPath];
    if ([self isHorizontal]) {
        attributes.frame = CGRectMake(0, 0, size.width, CGRectGetHeight(self.collectionView.bounds));
    } else {
        attributes.frame = CGRectMake(0, 0, CGRectGetWidth(self.collectionView.bounds), size.height);
    }

    [self.collectionView registerClass:[UICollectionReusableView class] forSupplementaryViewOfKind:UICollectionElementKindSectionHeader withReuseIdentifier:UICollectionElementKindSectionHeader];
    self.headerAttributes = attributes;
}

- (void)setupFooterAtIndexPath:(NSIndexPath *)indexPath
{
    UICollectionViewLayoutAttributes *attributes = [UICollectionViewLayoutAttributes layoutAttributesForSupplementaryViewOfKind:UICollectionElementKindSectionFooter withIndexPath:indexPath];

    CGSize size = [self footerSizeAtIndexPath:indexPath];
    CGFloat longestDimension = self.attributesGrid.longestSectionDimension;
    if ([self isHorizontal]) {
        attributes.frame = CGRectMake(longestDimension, 0, size.width, CGRectGetHeight(self.collectionView.bounds));
    } else {
        attributes.frame = CGRectMake(0, longestDimension, CGRectGetWidth(self.collectionView.bounds), size.height);
    }

    [self.collectionView registerClass:[UICollectionReusableView class] forSupplementaryViewOfKind:UICollectionElementKindSectionFooter withReuseIdentifier:UICollectionElementKindSectionFooter];
    self.footerAttributes = attributes;
}

- (CGSize)collectionViewContentSize
{
    NSIndexPath *indexPathZero = [NSIndexPath indexPathForItem:0 inSection:0];
    BOOL isHorizontal = self.isHorizontal;
    CGFloat alternateDimension = 0;

    // This includes the header height even if there are no items.
    alternateDimension = self.attributesGrid.longestSectionDimension;

    if (self.itemCount > 0) {
        // Add trailing inset/margin
        if (isHorizontal) {
            alternateDimension += (self.hasContentInset ? self.contentInset.right : self.itemMargins.width);
        } else {
            alternateDimension += (self.hasContentInset ? self.contentInset.bottom : self.itemMargins.height);
        }
    }

    // Always include the footer.
    CGFloat footerHeight = [self footerDimensionAtIndexPath:indexPathZero];
    if (footerHeight != NSNotFound) {
        alternateDimension += footerHeight;
    }

    CGSize contentSize = self.collectionView.frame.size;
    if (isHorizontal) {
        contentSize.width = alternateDimension;
    } else {
        contentSize.height = alternateDimension;
    }

    return contentSize;
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)path
{
    NSArray *attributes = self.attributesGrid.allItemAttributes;
    // This can happen during a reload, returning nil is no problem.
    if (path.row > attributes.count - 1) return nil;
    return attributes[path.row];
}

- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect
{
    // Lays out all of the cells in the collection view
    // extremely performance critical code.
    NSArray *attributes = self.attributesGrid.allItemAttributes;
    return [attributes filteredArrayUsingPredicate:[NSPredicate predicateWithBlock:^BOOL(id evaluatedObject, NSDictionary *bindings) {
        return CGRectIntersectsRect(rect, [evaluatedObject frame]);
    }]];
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForSupplementaryViewOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath
{
    if ([kind isEqualToString: ARCollectionElementKindSectionStickyHeader]) {
        return [self attributesForStickyHeader];
    } else if ([kind isEqualToString:UICollectionElementKindSectionHeader]) {
        return self.headerAttributes;
    } else if ([kind isEqualToString:UICollectionElementKindSectionFooter]) {
        return self.footerAttributes;
    }

    return nil;
}

- (UICollectionViewLayoutAttributes *)attributesForStickyHeader
{
    NSIndexPath *indexPathZero = [NSIndexPath indexPathForRow:0 inSection:0];
    CGFloat maxDistanceFromLeadingEdge = [self headerDimensionAtIndexPath:indexPathZero];
    CGFloat edge = MAX(maxDistanceFromLeadingEdge, self.collectionView.contentOffset.y);

    BOOL isScrolling = edge != maxDistanceFromLeadingEdge;
    if (isScrolling != self.stickyHeaderIsScrolling && self.delegate && [self.delegate respondsToSelector:@selector(collectionView:layout:stickyHeaderHasChangedStickyness:)]) {
        [self.delegate collectionView:self.collectionView layout:self stickyHeaderHasChangedStickyness:isScrolling];
    }
    self.stickyHeaderIsScrolling = isScrolling;

    CGSize stickySize = CGSizeZero;
    if (self.delegate && [self.delegate respondsToSelector:@selector(collectionView:layout:referenceSizeForStickyHeaderInSection:)]) {
        stickySize = [self.delegate collectionView:self.collectionView layout:self referenceSizeForStickyHeaderInSection:0];
    }

    if (!self.stickyHeaderAttributes) {
        _stickyHeaderAttributes = [UICollectionViewLayoutAttributes layoutAttributesForSupplementaryViewOfKind:ARCollectionElementKindSectionStickyHeader withIndexPath:indexPathZero];

        _stickyHeaderAttributes.zIndex = 1024;
        [self.collectionView registerClass:[UICollectionReusableView class] forSupplementaryViewOfKind:ARCollectionElementKindSectionStickyHeader withReuseIdentifier:ARCollectionElementKindSectionStickyHeader];
    }

    if ([self isHorizontal]) {
        self.stickyHeaderAttributes.frame = CGRectMake(edge, 0, stickySize.width, CGRectGetHeight(self.collectionView.bounds));
    } else {
        self.stickyHeaderAttributes.frame = CGRectMake(0, edge, CGRectGetWidth(self.collectionView.bounds), stickySize.height);
    }

    return self.stickyHeaderAttributes;
}

/// We allow this to always pass through (this is called on
/// every scroll tick ) so we can do invalidation on the
/// ARCollectionElementKindSectionStickyHeader

- (BOOL)shouldInvalidateLayoutForBoundsChange:(CGRect)newBounds
{
    return YES;
}

- (UICollectionViewLayoutInvalidationContext *)invalidationContextForBoundsChange:(CGRect)newBounds
{
    NSIndexPath *indexPathZero = [NSIndexPath indexPathForRow:0 inSection:0];

    UICollectionViewFlowLayoutInvalidationContext *context = (UICollectionViewFlowLayoutInvalidationContext *)[super invalidationContextForBoundsChange:newBounds];

    // Only invalidate the flow layout (masonry bits) when something drastic has happened
    BOOL needsEverything = !CGSizeEqualToSize(newBounds.size, self.collectionView.bounds.size);
    context.invalidateFlowLayoutDelegateMetrics = needsEverything;
    if (needsEverything) {
        if ([self footerDimensionAtIndexPath:indexPathZero] != NSNotFound) {
            [context invalidateSupplementaryElementsOfKind:UICollectionElementKindSectionFooter atIndexPaths:@[indexPathZero]];
        }
        if ([self headerDimensionAtIndexPath:indexPathZero] != NSNotFound) {
            [context invalidateSupplementaryElementsOfKind:UICollectionElementKindSectionHeader atIndexPaths:@[indexPathZero]];
        }
    }

    // The sticky header should always be invalidated
    [context invalidateSupplementaryElementsOfKind:ARCollectionElementKindSectionStickyHeader atIndexPaths:@[indexPathZero]];

    return context;
}

// The offset used on the non-main direction to ensure centering
- (CGFloat)generateCenteringOffsetWithMainDimension:(CGFloat)dimension
{
    NSInteger numberOfLines = self.rank;
    CGFloat contentWidth = numberOfLines * self.dimensionLength;

    CGFloat contentMargin = [self mainItemMargin];
    contentWidth += (numberOfLines - 1) * contentMargin;

    return (dimension / 2) - (contentWidth / 2);
}

- (BOOL)hasContentInset
{
    return !UIEdgeInsetsEqualToEdgeInsets(self.contentInset, UIEdgeInsetsZero);
}

- (BOOL)isHorizontal
{
    return (self.direction == ARCollectionViewMasonryLayoutDirectionHorizontal);
}

/// When vertical this is the horizontal item margin, when
/// horizontal its the vertical

- (CGFloat)mainItemMargin
{
    return (self.isHorizontal) ? self.itemMargins.height : self.itemMargins.width;
}

/// The opposite of above, the space vertically when in vertical mode

- (CGFloat)alternateItemMargin
{
    return (self.isHorizontal) ? self.itemMargins.width : self.itemMargins.height;
}

@end
