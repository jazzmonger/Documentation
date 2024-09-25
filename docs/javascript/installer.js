// GitHub API URL to list contents of the 'manifests' directory
const apiUrl = 'https://api.github.com/repos/FutureProofHomes/Documentation/contents/manifests';

// Function to fetch versions dynamically
async function fetchVersions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Fetched data:', data);
    // Filter directories only
    const versions = data
      .filter(item => item.type === 'dir')
      .map(dir => dir.name);

    populateVersions(versions);
    updateManifestURL();
  } catch (error) {
    console.error('Error fetching versions:', error);
  }
}

// Populate the versions dropdown
function populateVersions(versions) {
  const versionSelect = document.getElementById('version-select');
  versions.forEach(version => {
    const option = document.createElement('option');
    option.value = version;
    option.textContent = version;
    versionSelect.appendChild(option);
  });
}

// Update the manifest URL based on selections
function updateManifestURL() {
  const revision = document.querySelector('input[name="revision"]:checked').value;
  const version = document.getElementById('version-select').value;
  const manifestPath = `manifests/${version}/satellite-va-${revision}-esp32s3.manifest.json`;

  // Construct the full URL to your manifest file on GitHub
  const manifestURL = `https://raw.githubusercontent.com/FutureProofHomes/Documentation/main/${manifestPath}`;

  // Update the manifest attribute
  document.getElementById('install-button').setAttribute('manifest', manifestURL);
}

// TODO: Use this insead of #initAfterDecryption
// Initialize the form
// document.addEventListener('DOMContentLoaded', () => {
//   fetchVersions();

//   // Add event listeners
//   document.querySelectorAll('input[name="revision"]').forEach(radio => {
//     radio.addEventListener('change', updateManifestURL);
//   });
//   document.getElementById('version-select').addEventListener('change', updateManifestURL);
// });

function initAfterDecryption() {
  console.log("Initializing after decryption");
  fetchVersions();
  // Your initialization code here
  populateVersions();
  updateManifestURL();

  // Add event listeners
  document.querySelectorAll('input[name="revision"]').forEach(radio => {
    radio.addEventListener('change', updateManifestURL);
  });
  document.getElementById('version-select').addEventListener('change', updateManifestURL);
}

initAfterDecryption();
