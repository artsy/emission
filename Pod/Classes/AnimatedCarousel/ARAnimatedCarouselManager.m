#import "ARAnimatedCarouselManager.h"

@interface ARAnimatedCarousel : UIView
@property (nonatomic, strong, readonly) CALayer *backgroundLayer;
@property (nonatomic, strong, readonly) CALayer *staticImageLayer;
@property (nonatomic, assign, readonly) CGSize imageSize;
@end

@implementation ARAnimatedCarousel

- (instancetype)init;
{
    if ((self = [super init])) {
        // Should be a small image
        UIImage *image = [UIImage imageWithContentsOfFile:@"/Users/eloy/Downloads/smaller-3.jpg"];
        _imageSize = image.size;

        self.layer.masksToBounds = YES;
        
        _backgroundLayer = [CALayer layer];
        // Offload this or look if using GPUImage makes sense?
        CIImage *inputImage = [[CIImage alloc] initWithImage:image];
        CIFilter *blurFilter = [CIFilter filterWithName:@"CIBoxBlur"];
        [blurFilter setDefaults];
        [blurFilter setValue:inputImage forKey:@"inputImage"];
        [blurFilter setValue:@(10) forKey:@"inputRadius"];
        CIImage *outputImage = [blurFilter valueForKey:@"outputImage"];
        CIContext *context = [CIContext contextWithOptions:nil];
        CGImageRef blurredImage = [context createCGImage:outputImage fromRect:outputImage.extent];
        _backgroundLayer.contents = (__bridge id)blurredImage;
        CGImageRelease(blurredImage);
        [self.layer addSublayer:_backgroundLayer];

        _staticImageLayer = [CALayer layer];
        _staticImageLayer.contentsGravity = kCAGravityResizeAspect;
        _staticImageLayer.contents = (__bridge id)image.CGImage;
        [self.layer addSublayer:_staticImageLayer];
    }
    return self;
}

- (void)layoutSubviews;
{
    [super layoutSubviews];

    [CATransaction begin];
    [CATransaction setDisableActions:YES];
    CGFloat scale = 10;
    CGRect bounds = self.bounds;
    self.backgroundLayer.frame = CGRectIntegral((CGRect){ 0, (CGRectGetMidY(bounds) - (self.imageSize.height * scale)) / 2, self.imageSize.width * scale, self.imageSize.height * scale });
    CGFloat midX = CGRectGetMidX(bounds);
    self.staticImageLayer.frame = CGRectMake(midX, 0, midX - (midX * 0.1), CGRectGetHeight(bounds));
    [CATransaction commit];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self startAnimation];
    });
}

- (void)startAnimation;
{
    [CATransaction begin];
    [CATransaction setAnimationDuration:60];
    CGRect frame = self.backgroundLayer.frame;
    frame.origin.x = CGRectGetWidth(self.bounds) - CGRectGetWidth(frame);
    self.backgroundLayer.frame = frame;
    [CATransaction commit];
}

@end

@implementation ARAnimatedCarouselManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
    ARAnimatedCarousel *carousel = [ARAnimatedCarousel new];
    return carousel;
}

@end
