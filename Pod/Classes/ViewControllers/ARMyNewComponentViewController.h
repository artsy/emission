#import "ARComponentViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface ARMyNewComponentViewController : ARComponentViewController

- (instancetype)initWithArtistID:(NSString *)artistID;

@property (nonatomic, readonly) NSString *artistID;

@end

NS_ASSUME_NONNULL_END
