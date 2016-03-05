#import <UIKit/UIKit.h>

@class ARCollectionViewMasonryLayout;

/// An extension on UICollectionViewDelegateFlowLayout with some extras for the masonry.

@protocol ARCollectionViewMasonryLayoutDelegate <UICollectionViewDelegateFlowLayout>

/// If you have a vertical direction then this is the height
/// and width for horizontal.
- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(ARCollectionViewMasonryLayout *)collectionViewLayout variableDimensionForItemAtIndexPath:(NSIndexPath *)indexPath;

@optional

/// The size of the sticky header if implemented
- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout referenceSizeForStickyHeaderInSection:(NSInteger)section;

/// A callback for when a sticky header has changed it's attatched state
- (void)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout stickyHeaderHasChangedStickyness:(BOOL)isAttachedToLeadingEdge;

@end

typedef NS_ENUM(NSInteger, ARCollectionViewMasonryLayoutDirection){
    ARCollectionViewMasonryLayoutDirectionVertical,
    ARCollectionViewMasonryLayoutDirectionHorizontal
};

/// The class string for the supplementary view for a sticky header
/// that sits under the 1st header.
extern NSString *const ARCollectionElementKindSectionStickyHeader;


/// The ARCollectionViewMasonryLayout is a collectionview layout that can
/// lay out items in a horizontal or vertical layout in a way that flows all
/// the content edge to edge in lines

@interface ARCollectionViewMasonryLayout : UICollectionViewFlowLayout

/// Create a layout with a direction
- (instancetype)initWithDirection:(enum ARCollectionViewMasonryLayoutDirection)direction;

/// Deprecated
- (instancetype)init __attribute__((unavailable("Invoke the designated initializer initWithDirection: instead.")));

/// Direction of the collection view layout. Set in the initializer.
@property (nonatomic, readonly) enum ARCollectionViewMasonryLayoutDirection direction;

/// How many columns when vertical or rows when horizontal.
/// defaults to 2.
@property (nonatomic, assign) NSUInteger rank;

/// Width for every column when horizontal, or row when vertical.
@property (nonatomic, assign) CGFloat dimensionLength;

/// The margins used that can be used of offset content
/// without this content will be centered veritcally, or horizontally.
@property (nonatomic, assign) UIEdgeInsets contentInset;

/// The margins between items and between lines of items
@property (nonatomic, assign) CGSize itemMargins;

/// Use this function to use the same layouting engine but
/// without needing to have a collectionview. Useful for
/// getting dimensions in advance for tableview cells.
- (CGFloat)longestDimensionWithLengths:(NSArray *)variableDimensions withOppositeDimension:(CGFloat)staticDimension;

@end
