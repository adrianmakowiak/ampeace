# Semantic Commit Messages

Format: `<type>(<scope>): <subject>`

`<scope>` can be:
- all - if change apply to project in general
- be - if change apply only to <b>backend</b>
- fe - if change apply only to <b>frontend</b>

## Example

```
feat(all): add hat wobble
^--^^---^  ^------------^
|   |      |
|   |      +-> Summary in present tense.
|   |
|   +------> Scope: all, be or fe.
|   
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)