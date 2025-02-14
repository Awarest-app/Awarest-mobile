#import "AppDelegate.h"
// #import "ReactNativeConfig.h"
#import <React/RCTLinkingManager.h>
#import <FirebaseCore.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"test";
  // You can add your custom initial props in the dictionary below.
  [FIRApp configure];
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// iOS 9 이상에서 사용
- (BOOL)application:(UIApplication *)application 
            openURL:(NSURL *)url 
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  // RCTLinkingManager를 통해 React Native 쪽으로 URL 전달
  BOOL handled = [RCTLinkingManager application:application openURL:url options:options];
  if (handled) {
    return YES;
  }

  // 만약 RN에서 처리하지 않는 URL이라면, 다른 처리 로직이 있을 수 있음
  return NO;
}

@end
