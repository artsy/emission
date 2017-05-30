#import "ARRootViewController+AppHub.h"
#import "NSDateFormatter+TimeAgo.h"

#import <AppHub/AppHub.h>
#import <ARGenericTableViewController/ARGenericTableViewController.h>

@implementation ARRootViewController(AppHub)

- (ARSectionData *)appHubSectionData;
{
  ARSectionData *section = [[ARSectionData alloc] initWithCellDataArray: @[
    [self appHubBuildChooser],
    [self appHubMetadata],
    [self showPRForBuild]
  ]];
  section.headerTitle = [@"AppHub" uppercaseString];
  return section;
}

- (ARCellData *)appHubMetadata
{
  ARCellData *cellData = [[ARCellData alloc] initWithIdentifier:AROptionCell];
  cellData.cellConfigurationBlock = ^(UITableViewCell *cell) {
    AHBuild *build = [[AppHub buildManager] currentBuild];
    if (!build) {
      cell.textLabel.text = @"Not downloaded yet";
    } if (build && !build.creationDate) {
      cell.textLabel.text = @"Current Build: Bundled with Emission";
    } else {
      
      NSString *timeString =  [NSDateFormatter timeAgoFromDate:build.creationDate];
      cell.textLabel.text = [NSString stringWithFormat:@"Current Build: From %@", timeString];
    }
  };
  return cellData;
}

- (ARCellData *)showPRForBuild
{
  ARCellData *cellData = [[ARCellData alloc] initWithIdentifier:AROptionCell];
  AHBuild *build = [[AppHub buildManager] currentBuild];
  NSString *pr = nil;

  if (build && build.buildDescription) {
    pr = [[build.buildDescription componentsSeparatedByString:@"- #"] lastObject];
  }

  cellData.cellConfigurationBlock = ^(UITableViewCell *cell) {
    if (!pr) {
      cell.textLabel.text = @"Not on an AppHub build...";
    } else {
      cell.textLabel.text = [NSString stringWithFormat:@"Link to PR %@", pr];
    }
  };

  cellData.cellSelectionBlock = ^(UITableView *tableView, NSIndexPath *indexPath) {
    if(pr) {
      NSString *prAddresss = [NSString stringWithFormat:@"https://github.com/artsy/emission/pull/%@", pr];
      [[UIApplication sharedApplication] openURL:[NSURL URLWithString:prAddresss]];
    }
  };
  return cellData;
}

- (ARCellData *)appHubBuildChooser
{
  ARCellData *cellData = [[ARCellData alloc] initWithIdentifier:AROptionCell];
  cellData.cellConfigurationBlock = ^(UITableViewCell *cell) {
    cell.textLabel.text = @"Choose an RN build";
  };
  cellData.cellSelectionBlock = ^(UITableView *tableView, NSIndexPath *indexPath) {
    [AppHub presentSelectorOnViewController:self withBuildHandler:^(AHBuild *build, NSError *error) {
      [self.tableView reloadData];
    }];
  };
  return cellData;
}

@end
