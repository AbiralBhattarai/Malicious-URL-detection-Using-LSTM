// background.js

// Listen for tab URL changes
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      // Log the updated URL to the console
      console.log('Current URL:', changeInfo.url);
    }
  });
  