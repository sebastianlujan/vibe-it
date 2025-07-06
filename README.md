# Vibe-it

A tool to make devconnect easy and accessible.

## Installation

### Prerequisites

Make sure you have a Linux system with appropriate permissions to install system-wide binaries.

### Installing Oasis CLI

1. **Download the binary**
   
   Visit the [Oasis CLI releases page](https://github.com/oasisprotocol/cli/releases) and download the appropriate binary for your system.

2. **Install the binary**
   
   Once you download the binary, move it to the appropriate folder and give it execution permissions:

   ```bash
   sudo mv ~/Downloads/oasis_cli_0.14.1_linux_amd64/oasis /usr/local/bin/
   sudo chmod +x /usr/local/bin/oasis
   ```

3. **Verify installation**
   
   Check that the installation was successful:

   ```bash
   oasis --version
   ```