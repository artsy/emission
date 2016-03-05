ARCollectionViewMasonryLayout
=============================

[![Build Status](https://travis-ci.org/ashfurrow/ARCollectionViewMasonryLayout.svg)](https://travis-ci.org/ashfurrow/ARCollectionViewMasonryLayout)

ARCollectionViewMasonryLayout is a `UICollectionViewLayout` subclass for creating flow-like layouts with dynamic widths or heights.

![Screenshot](Screenshots/ARCollectionViewMasonryLayout.png)

Usage
-----

Create an instance of a `ARCollectionViewMasonryLayout`.

```objc
ARCollectionViewMasonryLayout *layout = [[ARCollectionViewMasonryLayout alloc] initWithDirection:ARCollectionViewMasonryLayoutDirectionVertical];
```

Create a collection view. Its delegate *must* conform to the `ARCollectionViewMasonryLayoutDelegate` protocol in order to retrieve the variable dimensions of the cells.

```objc
@interface ARCollectionViewController : UICollectionViewController

@end
```

```objc
@interface ARCollectionViewController () <ARCollectionViewMasonryLayoutDelegate>

@end

@implementation ARCollectionViewController

#pragma mark - UIViewController Lifecycle and Callbacks

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self.collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@"Cell"];
}

#pragma mark - UICollectionViewDataSource Methods

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return 10;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"Cell" forIndexPath:indexPath];
    CGFloat colorSeed = (indexPath.row * 3 % 255)/255.0f; // random-ish color
    cell.backgroundColor = [UIColor colorWithRed:colorSeed green:colorSeed blue:colorSeed alpha:1];
    return cell;
}

#pragma mark - ARCollectionViewMasonryLayoutDelegate Methods

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(ARCollectionViewMasonryLayout *)collectionViewLayout variableDimensionForItemAtIndexPath:(NSIndexPath *)indexPath
{
    return (CGFloat)(indexPath.row * 10 % 30) + 40; // random-ish varying size
}

@end
```

Headers and Footers
-------------------

The masonry layout supports a fixed height header and footer that scroll along with the contents of the view. These can be added by implementing the following delegate methods on the `UIViewController`.

```objc
- (UICollectionReusableView *)collectionView:(UICollectionView *)collectionView viewForSupplementaryElementOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath
{
    // return a header and/or footer view, must be a UICollectionReusableView
    // kind is one of UICollectionElementKindSectionHeader or UICollectionElementKindSectionFooter
    UICollectionReusableView *view = [collectionView dequeueReusableSupplementaryViewOfKind:kind withReuseIdentifier:kind forIndexPath:indexPath];
    view.backgroundColor = [UIColor whiteColor];
    return view;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(ARCollectionViewMasonryLayout *)collectionViewLayout dimensionForHeaderAtIndexPath:(NSIndexPath *)indexPath
{
    return 20; // header length
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(ARCollectionViewMasonryLayout *)collectionViewLayout dimensionForFooterAtIndexPath:(NSIndexPath *)indexPath
{
    return 10; // footer length
}
```

Sticky Headers
------------------

The layout supports having a custom sticky header ( similar to the ones in a `UITableView`. ) It behaves simiar to how Headers and footers work. However it needs the layout delegate to support `collectionView:layout:referenceSizeForStickyHeaderInSection:`. 

``` objc

- (UICollectionReusableView *)collectionView:(UICollectionView *)collectionView viewForSupplementaryElementOfKind:(NSString *)kind atIndexPath:(NSIndexPath *)indexPath
{
    [..]
    } if ([kind isEqualToString:ARCollectionElementKindSectionStickyHeader]) {
        UICollectionReusableView *view = [collectionView dequeueReusableSupplementaryViewOfKind:kind withReuseIdentifier:kind forIndexPath:indexPath];
        view.backgroundColor = [UIColor purpleColor];
        return view;

    }
    [..]
}


- (CGSize)collectionView:(UICollectionView *)collectionView layout:(ARCollectionViewMasonryLayout *)collectionViewLayout referenceSizeForStickyHeaderInSection:(NSInteger)section
{
    return self.stickyHeaderSize;
}


```

It also provides a callback incase you want to make transitions when the header is sticky or not:

```
- (void)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout stickyHeaderHasChangedStickyness:(BOOL)isAttachedToLeadingEdge
{
    NSLog(@"Attatched: %@", @(isAttachedToLeadingEdge));
}

```

Demo Project
------------

This repository contains a demo project showing the use of the collection view layout. The view controller creates a number of `ARModel` instances which represent a color and dimension of a cell. These values are assigned from a collection of colors in `viewDidLoad`. When the collection view asks for a cell, the cell's background colour is set to the corresponding model's color. The layout queries the collection view's delegate for dimension information, and the corresponding model's dimension is returned.

License
-------

Licensed under MIT.

Credits
-------

Originally created by [Orta](https://github.com/orta) for [Artsy](https://artsy.net).
