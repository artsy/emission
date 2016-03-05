#import <UIKit/UIKit.h>

/// This class uses ‘sections’ to indicate ‘columns’ in a vertical layout and ‘rows’ in a horizontal layout.
@interface _ARCollectionViewMasonryAttributesGrid : NSObject

/// All of the attributes
@property (nonatomic, readonly) NSArray *allItemAttributes;

/// So you can keep state easily.
@property (nonatomic, readonly) CGFloat longestSectionDimension;

/// Standard init function
- (instancetype)initWithSectionCount:(NSUInteger)sectionCount
                        isHorizontal:(BOOL)isHorizontal
                        leadingInset:(CGFloat)leadingInset
                     orthogonalInset:(CGFloat)orthogonalInset
                      mainItemMargin:(CGFloat)mainItemMargin
                 alternateItemMargin:(CGFloat)alternateItemMargin
                     centeringOffset:(CGFloat)centeringOffset;

/// Adds `attributes` to the shortest section.
/// Its frame will be calculated based on `-[UICollectionViewLayoutAttributes size]`.
///
- (void)addAttributes:(UICollectionViewLayoutAttributes *)attributes;

/// Ensures that no item sticks out more than 50% compared to the shortest section in front of it. When it does, the
/// item is moved to that shortest section. This is repeated until there are no more offending items.
///
- (void)ensureTrailingItemsDoNotStickOut;

@end
