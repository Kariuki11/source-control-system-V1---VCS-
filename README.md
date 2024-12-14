# Griit - A Basic Version Control System

Griit is a simple, custom version control system. It replicates some basic functionalities of Git, such as initializing a repository, staging files, and committing changes. This project is still under development, and the current implementation focuses on foundational features.

---

## Features Implemented So Far

1. **Initialization of a Griit Repository**:
   - The repository is initialized with a `.griit` directory in the project folder.
   - The `.griit` directory contains the following subdirectories and files:
     - `objects/` - Stores hashed objects (e.g., commit-related data).
     - `HEAD` - Tracks the current commit hash.
     - `index` - A JSON array representing the staging area.
   - If the `.griit` directory already exists, the program logs a message:
     `"Already Initialized the .griit folder"`.

2. **Adding Files to Staging Area**:
   - Files are read, hashed using the SHA-1 algorithm, and stored in the `objects/` directory.
   - The file path and its hash are added to the `index` file, representing the staging area.
   - Logs the hash of the file and a confirmation message:
     `"Added <filename>"`.

3. **Committing Changes**:
   - A commit operation captures:
     - **Commit Message** - Provided during the commit.
     - **Timestamp** - Captured as the time of the commit.
     - **Files** - All staged files from the `index`.
     - **Parent Commit** - The previous commit hash (stored in `HEAD`).
   - The commit stores the following in the `objects/` folder:
     - `commit_message` - Contains the commit message.
     - `commit_timestamp` - Contains the ISO timestamp of the commit.
   - Updates `HEAD` with the new commit hash.
   - Clears the `index` file (sets it to an empty array `[]`).
   - Logs the commit hash and a success message:
     `"Successfully Committed: <commit hash>"`.

---

## Project Structure

After initializing a Griit repository, the directory structure looks like this:

```
.griit/
  |- objects/
      |- commit_message      # Stores the latest commit message
      |- commit_timestamp    # Stores the timestamp of the latest commit
  |- HEAD                    # Tracks the current commit hash
  |- index                   # JSON file representing the staging area
```

---

## How to Use

1. **Initialize a Griit Repository**:
   - Instantiate the `Griit` class with the desired repository path.
   ```javascript
   const griit = new Griit();
   ```

2. **Add Files to Staging Area**:
   - Add a file to the staging area using the `add` method.
   ```javascript
   await griit.add('sample.txt');
   ```
   - This will:
     - Read the file.
     - Create a hashed object for the file in `objects/`.
     - Update the `index` file with the file path and hash.

3. **Commit Changes**:
   - Commit the staged files using the `commit` method, providing a commit message.
   ```javascript
   await griit.commit('Initial Commit');
   ```
   - This will:
     - Save the commit message and timestamp in the `objects/` directory.
     - Update the `HEAD` file with the new commit hash.
     - Clear the `index` file.

---

## Current Limitations

1. The code does not yet support branches, merges, or history retrieval.
2. Only the foundational features have been implemented; additional functionality will be added in future iterations.
3. Commit files (`commit_message` and `commit_timestamp`) are overwritten with each new commit; they do not store a full history.

---

## Development Notes

This project is a work in progress, intended to provide a learning opportunity in building a version control system. Future updates will include:
- Storing complete commit histories.
- Viewing commit logs.
- Implementing branching and merging functionality.

---

## Running the Code

Run the provided script as follows:

```javascript
(async () => {
    const griit = new Griit();
    await griit.add('sample.txt');
    await griit.commit('Initial Commit');
})();
```

Expected Outputs:
- **Initialization**: `"Already Initialized the .griit folder"` (if reinitialized).
- **Add**: Outputs the file hash and confirmation: `"Added sample.txt"`.
- **Commit**: Outputs the commit hash and success message: `"Successfully Committed: <commit hash>"`.

---

## Author
This project is created by:
        `"Kariuki11"`
        kariukikennnedy288@gmail.com