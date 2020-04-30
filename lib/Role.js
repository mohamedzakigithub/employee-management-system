// Define and export the Role class
class Role {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  display() {
    return this.name;
  }

  update() {}

  deletes() {}
}
module.exports = Role;
