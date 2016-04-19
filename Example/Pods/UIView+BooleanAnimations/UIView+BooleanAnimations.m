#import "UIView+BooleanAnimations.h"

@implementation UIView (BooleanDependentAnimation)

+ (void)animateIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration :(void (^)(void))animations
{
    [self animateIf:shouldAnimate duration:duration :animations completion:nil];
}

+ (void)animateIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration :(void (^)(void))animations completion:(void (^)(BOOL finished))completion
{
    if (shouldAnimate) {
        [UIView animateWithDuration:duration animations:animations completion:completion];
    } else {
        animations();
        if (completion) completion(YES);
    }
}

+ (void)animateIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration options:(UIViewAnimationOptions)options :(void (^)(void))animations
{
    [self animateIf:shouldAnimate duration:duration delay:0 options:options :animations completion:nil];
}

+ (void)animateIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration delay:(NSTimeInterval)delay options:(UIViewAnimationOptions)options :(void (^)(void))animations completion:(void (^)(BOOL finished))completion
{
    if (!shouldAnimate) {
        if(animations) animations();
        if(completion) completion(YES);
    } else {
        [UIView animateWithDuration:duration delay:delay options:options animations:animations completion:completion];
    }
}

+ (void)animateSpringIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration delay:(NSTimeInterval)delay damping:(CGFloat)damping velocity:(CGFloat)velocity :(void (^)(void))animations
{
    [self animateSpringIf:shouldAnimate duration:duration delay:delay damping:damping velocity:velocity :animations completion:nil];
}

+ (void)animateSpringIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration delay:(NSTimeInterval)delay damping:(CGFloat)damping velocity:(CGFloat)velocity :(void (^)(void))animations completion:(void (^)(BOOL finished))completion
{
    if (shouldAnimate) {
        [UIView animateWithDuration:duration delay:delay usingSpringWithDamping:damping initialSpringVelocity:velocity options:UIViewAnimationOptionCurveEaseIn animations:animations completion:completion];
    } else {
        animations();
        if (completion) completion(YES);
    }
}

- (void)addSubview:(UIView *)view andFadeInForDuration:(CGFloat)duration if:(BOOL)shouldAnimate
{
    if (shouldAnimate) {
        view.alpha = 0;
        [self addSubview:view];
        [UIView animateWithDuration:duration animations:^{
            view.alpha = 1;
        }];
    } else {
        [self addSubview:view];
    }
}

- (void)removeFromSuperviewAndFadeOutWithDuration:(CGFloat)duration if:(BOOL)shouldAnimate
{
    if (shouldAnimate) {
        [UIView animateWithDuration:duration animations:^{
            self.alpha = 0;
        } completion:^(BOOL finished) {
            [self removeFromSuperview];
        }];
    } else {
        [self removeFromSuperview];
    }
}

+ (void)animateTwoStepIf:(BOOL)shouldAnimate duration:(NSTimeInterval)duration :(void (^)(void))initialAnimations midway:(void (^)(void))midwayAnimations completion:(void (^)(BOOL finished))completion
{
    [self animateIf:shouldAnimate duration:duration/2 :^{
        if (initialAnimations) {
            initialAnimations();
        }
    } completion:^(BOOL finished) {
        [self animateIf:shouldAnimate duration:duration/2 :^{
            if (midwayAnimations) {
                midwayAnimations();
            }
        } completion:completion];
    }];
}

@end
