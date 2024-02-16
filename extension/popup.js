
    // Function to update URL visibility
    function updateUrlVisibility() {
      var urlLabel = document.getElementById("url-label");
      var currentUrl = document.getElementById("current-url");
      var toggleSwitch = document.getElementById("toggle-switch");

      if (toggleSwitch.checked) {
        urlLabel.style.display = "block";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var currentUrlText = tabs[0].url;
          currentUrl.textContent = currentUrlText;
          console.log(currentUrlText); // Log the URL to console
        });
      } else {
        urlLabel.style.display = "none";
      }
    }

    // Initialize URL visibility based on the initial state of the slider
    updateUrlVisibility();

    // Update URL visibility when the slider state changes
    document.getElementById("toggle-switch").addEventListener("change", function() {
      // Save the state of the slider to local storage
      chrome.storage.local.set({sliderState: this.checked}, function() {
        // Notify that the state was saved
        console.log('Slider state saved');
      });

      updateUrlVisibility();
    });

    // Retrieve the state of the slider from local storage
    chrome.storage.local.get(['sliderState'], function(result) {
      if (result.sliderState) {
        // If the slider state is true (checked), set it to checked
        document.getElementById("toggle-switch").checked = true;
      }
    });

    // Listen for tab URL changes
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (document.getElementById("toggle-switch").checked && changeInfo.url) {
        console.log('URL updated:', changeInfo.url); // Log the updated URL to console
        document.getElementById("current-url").textContent = changeInfo.url;
      }
    });

    // Listen for when the popup is opened
    document.addEventListener('DOMContentLoaded', function() {
      // Update URL visibility when the popup is opened
      updateUrlVisibility();
    });
