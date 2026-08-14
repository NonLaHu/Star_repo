export class Commit {
  constructor({
    hash,
    message,
    author,
    branch,
    date,
    additions,
    deletions
  }) {
    this.hash = hash;
    this.message = message;
    this.author = author;
    this.branch = branch;

    this.date =
      new Date(date);

    this.additions =
      additions;

    this.deletions =
      deletions;
  }

  get totalChanges() {
    return (
      this.additions +
      this.deletions
    );
  }
}