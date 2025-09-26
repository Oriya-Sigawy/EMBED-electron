# EMBED Open Data Electron

This is a Electron + React + Vite that implements a viewer of EMBED Open Data photos.
The goal is to allow simple access to mammography photos.
This electron get its info and photos from [server](https://github.com/AyeletKat/EMBED-server.git)
This electron has an analyzer that runs both the server and its Electron app: [Analyzer](https://github.com/AyeletKat/ddsm-analyzer.git). Its best to run it from the analyzer.

## Pre-Requisites

To use the following project, please make sure you have the following installed:

- [node](https://nodejs.org/en)
- [Server](https://github.com/AyeletKat/EMBED-server.git)

- Clone the repository:

```bash
git clone https://github.com/DDSM-CBIS/ddsm-electron.git
```

## Usage

Install requirements:

```bash
npm i
```

Run the application on development mode:

```bash
npm run dev
```

## Key Features

The Electron program is designed with several core functionalities to enhance the accessibility of the EMBED Open Data:

### Filtering Options

Users can filter patients by parameters based on the metadata unique values.  
The parameters are not “hard-coded”, and taken directly from the dataset, to allow the most flexibility and up-to-date information.   
This allows researchers to narrow down the dataset based on their specific needs.

### Viewing Patient Details and Images

Users can view patient's images and their metadata bu clicking on the images.

### Saving and Loading Queries

The program allows users to save frequently used queries, enabling quick re-filtering without having to manually input the parameters each time.
