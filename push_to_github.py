#!/usr/bin/env python3
import sys
import os
import dulwich.porcelain as git

def main():
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    repo = git.open_repo(repo_dir)

    token = sys.argv[1].strip() if len(sys.argv) > 1 else os.environ.get("GITHUB_TOKEN", "").strip()

    if token:
        # Push over HTTPS with token
        remote_url = f"https://{token}@github.com/sobangull64/website.git"
        print(f"Pushing to {remote_url[:20]}... (using token)")
        git.push(repo, remote_url, refspecs=b"refs/heads/main:refs/heads/main")
        print("Successfully pushed to https://github.com/sobangull64/website.git (main branch)!")
    else:
        # Push over SSH
        remote_url = "git@github.com:sobangull64/website.git"
        print(f"Pushing to {remote_url} via SSH...")
        git.push(repo, remote_url, refspecs=b"refs/heads/main:refs/heads/main")
        print("Successfully pushed to https://github.com/sobangull64/website.git (main branch)!")

if __name__ == "__main__":
    main()
