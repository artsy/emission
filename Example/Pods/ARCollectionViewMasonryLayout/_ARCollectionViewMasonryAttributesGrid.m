#import "_ARCollectionViewMasonryAttributesGrid.h"

@interface _ARCollectionViewMasonryAttributesGrid ()
@property (nonatomic, strong, readonly) NSArray *sections;
@property (nonatomic, assign) NSUInteger shortestSection;
@property (nonatomic, assign) CGFloat shortestSectionDimension;
@property (nonatomic, assign) CGFloat longestSectionDimension;
@property (nonatomic, assign, readonly) BOOL isHorizontal;
@property (nonatomic, assign, readonly) CGFloat leadingInset;
@property (nonatomic, assign, readonly) CGFloat orthogonalInset;
@property (nonatomic, assign, readonly) CGFloat mainItemMargin;
@property (nonatomic, assign, readonly) CGFloat alternateItemMargin;
@property (nonatomic, assign, readonly) CGFloat centeringOffset;
@property (nonatomic, assign, readonly) NSUInteger sectionCount;
@end

@implementation _ARCollectionViewMasonryAttributesGrid

- (instancetype)initWithSectionCount:(NSUInteger)sectionCount
                        isHorizontal:(BOOL)isHorizontal
                        leadingInset:(CGFloat)leadingInset
                     orthogonalInset:(CGFloat)orthogonalInset
                      mainItemMargin:(CGFloat)mainItemMargin
                 alternateItemMargin:(CGFloat)alternateItemMargin
                     centeringOffset:(CGFloat)centeringOffset;
{
    if ((self = [super init])) {
        _isHorizontal = isHorizontal;
        _leadingInset = leadingInset;
        _orthogonalInset = orthogonalInset;
        _mainItemMargin = mainItemMargin;
        _alternateItemMargin = alternateItemMargin;
        _centeringOffset = centeringOffset;
        _sectionCount = sectionCount;
        _shortestSection = 0;
        _longestSectionDimension = leadingInset;
        _shortestSectionDimension = leadingInset;

        NSMutableArray *sections = [NSMutableArray arrayWithCapacity:_sectionCount];
        for (NSUInteger i = 0; i < _sectionCount; i++) {
            [sections addObject:[NSMutableArray new]];
        }
        _sections = [sections copy];
    }
    return self;
}

#pragma mark - Geometry access

- (CGFloat)dimensionForAttributes:(UICollectionViewLayoutAttributes *)attributes;
{
    return self.isHorizontal ? attributes.size.width : attributes.size.height;
}

- (CGFloat)fixedDimensionForAttributes:(UICollectionViewLayoutAttributes *)attributes;
{
    return self.isHorizontal ? attributes.size.height : attributes.size.width;
}

- (CGFloat)maxEdgeForAttributes:(UICollectionViewLayoutAttributes *)attributes;
{
    CGFloat attributeMax = self.isHorizontal ? CGRectGetMaxX(attributes.frame) : CGRectGetMaxY(attributes.frame);
    return MAX(attributeMax, self.leadingInset);
}

- (CGFloat)dimensionForSection:(NSUInteger)sectionIndex;
{
    return [self maxEdgeForAttributes:[self lastAttributesOfSection:sectionIndex]];
}

#pragma mark - Layout Attributes access

- (NSArray *)allItemAttributes;
{
    NSMutableArray *attributes = [NSMutableArray new];
    for (NSArray *section in self.sections) {
        [attributes addObjectsFromArray:section];
    }
    return [attributes copy];
}

- (UICollectionViewLayoutAttributes *)lastAttributesOfSection:(NSUInteger)sectionIndex;
{
    return [self.sections[sectionIndex] lastObject];
}

- (void)addAttributes:(UICollectionViewLayoutAttributes *)attributes;
{
    [self addAttributes:attributes toSection:self.shortestSection];
}

- (void)addAttributes:(UICollectionViewLayoutAttributes *)attributes toSection:(NSUInteger)sectionIndex;
{
    [self calculateAttributesFrame:attributes inSection:sectionIndex];
    [self.sections[sectionIndex] addObject:attributes];
    [self updateLongestAndShortestDataWithAttributes:attributes inSection:(NSUInteger)sectionIndex];
}

#pragma mark - Longest and Shortest calculations

- (void)updateLongestAndShortestDataWithAttributes:(UICollectionViewLayoutAttributes *)attributes
                                         inSection:(NSUInteger)sectionIndex;
{
    // Update longestSectionDimension if this section is now longer.
    CGFloat sectionDimension = [self maxEdgeForAttributes:attributes];
    if (sectionDimension > self.longestSectionDimension) {
        self.longestSectionDimension = sectionDimension;
    }

    // Find the new shortestSection if this section used to be it.
    if (sectionIndex == self.shortestSection) {
        [self updateShortestSection];
    }
}

- (NSUInteger)shortestSectionUpTo:(NSUInteger)upToSectionIndex dimension:(CGFloat *)dimension;
{
    NSUInteger shortestSection = 0;
    CGFloat shortestSectionDimension = CGFLOAT_MAX;
    for (NSUInteger i = 0; i < upToSectionIndex; i++) {
        CGFloat sectionDimension = [self dimensionForSection:i];
        if (sectionDimension < shortestSectionDimension) {
            shortestSection = i;
            shortestSectionDimension = sectionDimension;
        }
    }
    if (dimension != NULL) {
        *dimension = shortestSectionDimension;
    }
    return shortestSection;
}

- (void)updateShortestSection;
{
    CGFloat shortestSectionDimension = self.leadingInset;
    self.shortestSection = [self shortestSectionUpTo:self.sectionCount dimension:&shortestSectionDimension];
    self.shortestSectionDimension = shortestSectionDimension;
}

#pragma mark - Layout calculations

- (void)calculateAttributesFrame:(UICollectionViewLayoutAttributes *)attributes inSection:(NSUInteger)sectionIndex;
{
    NSAssert(!CGSizeEqualToSize(attributes.size, CGSizeZero), @"Attributes are expected to specify a size.");

    CGFloat fixedDimension = [self fixedDimensionForAttributes:attributes];
    CGFloat dimension = [self dimensionForAttributes:attributes];

    CGFloat edgeX = (fixedDimension + self.mainItemMargin) * sectionIndex;

    CGFloat xOffset = self.orthogonalInset + self.centeringOffset + edgeX;
    CGFloat yOffset = [self dimensionForSection:sectionIndex];

    if ([self.sections[sectionIndex] count] != 0){
        // All other items get margin.
        yOffset += self.alternateItemMargin;
    }

    // Calculate center
    CGPoint itemCenter = (CGPoint) {
        xOffset + (fixedDimension / 2),
        yOffset + (dimension / 2)
    };
    if (self.isHorizontal) {
        itemCenter = (CGPoint){ itemCenter.y, itemCenter.x };
    }

    // Set rounded frame
    attributes.center = itemCenter;
    attributes.frame = CGRectIntegral(attributes.frame);
}

- (void)ensureTrailingItemsDoNotStickOut;
{
    // If the shortest section is the last section, than that’s a-ok.
    if (self.shortestSection == self.sectionCount - 1) {
        return;
    }

    BOOL updated = NO;

    // The item in the first section is never moved.
    for (NSUInteger sectionIndex = 1; sectionIndex < self.sectionCount; sectionIndex++) {
        if (sectionIndex == self.shortestSection) {
            continue;
        }

        CGFloat shortestSectionDimensionUpToCurrent = 0;
        NSUInteger shortestSectionUpToCurrent = [self shortestSectionUpTo:sectionIndex
                                                                dimension:&shortestSectionDimensionUpToCurrent];

        UICollectionViewLayoutAttributes *attributes = [self lastAttributesOfSection:sectionIndex];
        CGFloat lastItemDimension = [self dimensionForAttributes:attributes];
        CGFloat sectionMaxEdge = [self maxEdgeForAttributes:attributes];

        // Check if the item sticks out more than 50% compared to the shortest section in front of it.
        if (sectionMaxEdge > shortestSectionDimensionUpToCurrent + (lastItemDimension / 2)) {
            // Remove the item that sticks out from its current section.
            [self.sections[sectionIndex] removeLastObject];
            // Move the item to the shortest section to the front.
            [self addAttributes:attributes toSection:shortestSectionUpToCurrent];

            updated = YES;
            break;
        }
    }

    // Repeat till there's no more changes.
    if (updated) {
        [self updateShortestSection];
        [self ensureTrailingItemsDoNotStickOut];
    }
}

@end
