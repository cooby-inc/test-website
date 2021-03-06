// Generated by CoffeeScript 1.12.7
(function() {
  var Git, Repo, exec;

  exec = require('flex-exec');

  Repo = require('./repo');

  module.exports = Git = function(path, bare, git_options) {
    if (bare == null) {
      bare = false;
    }
    if (git_options == null) {
      git_options = {
        maxBuffer: Git.maxBuffer
      };
    }
    return new Repo(path, bare, git_options);
  };

  Git.maxBuffer = 5000 * 1024;

  Git.init = function(path, bare, callback) {
    var bash, ref;
    if (!callback) {
      ref = [callback, bare], bare = ref[0], callback = ref[1];
    }
    if (bare) {
      bash = ["git", "init", "--bare", "."];
    } else {
      bash = ["git", "init", "."];
    }
    return exec(bash, {
      cwd: path
    }, function(err, stdout, stderr) {
      if (err instanceof Error) {
        return callback(err);
      }
      return callback(null, new Repo(path, bare, {
        maxBuffer: Git.maxBuffer
      }));
    });
  };

  Git.clone = function(repository, path, depth, branch, callback) {
    var bash;
    if (depth == null) {
      depth = 0;
    }
    if (branch == null) {
      branch = null;
    }
    if (typeof branch === 'function') {
      callback = branch;
      branch = null;
    }
    if (typeof depth === 'function') {
      callback = depth;
      depth = 0;
    }
    bash = ["git", "clone", repository, path];
    if (branch !== null && typeof branch === 'string') {
      bash.push("--branch", branch);
    }
    if (depth !== 0 && typeof depth === 'number') {
      bash.push("--depth", depth);
    }
    return exec(bash, function(err, stdout, stderr) {
      if (err instanceof Error) {
        return callback(err);
      }
      return callback(null, new Repo(path, false, {
        maxBuffer: Git.maxBuffer
      }));
    });
  };

}).call(this);
