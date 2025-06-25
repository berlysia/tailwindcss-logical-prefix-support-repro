# Tailwind CSS v4 Compatibility Issues with tailwindcss-logical

This repository demonstrates compatibility issues between `tailwindcss-logical` plugin and Tailwind CSS v4, with comparison against the working v3 implementation.

## Summary

The `tailwindcss-logical` plugin experiences two critical issues when used with Tailwind CSS v4:

1. **CSS Variable Reference Errors**: Incorrect variable references in prefixed configurations
2. **Incomplete Class Generation**: Missing logical property classes with generic spacing tokens

Both issues are **v4-specific** and do not occur in v3.

## Issue Details

### Issue 1: CSS Variable Reference Errors in Prefixed Configurations

**Environment**: Tailwind CSS v4 with `prefix: 'tw:'`

**Problem**: Logical property classes reference unprefixed CSS variables instead of properly prefixed ones.

**Example**:

```css
/* Generated (incorrect) */
.tw\:mis-4 {
  margin-inline-start: calc(
    var(--spacing) * 4
  ); /* ❌ Should be --tw-spacing-4 */
}

/* Expected */
.tw\:mis-4 {
  margin-inline-start: var(--tw-spacing-4); /* ✅ */
}
```

### Issue 2: Incomplete Class Generation with Generic Spacing Tokens

**Environment**: Tailwind CSS v4 with generic spacing configuration

**Problem**: Logical property classes are not generated when using generic spacing tokens.

**Configuration that fails**:

```css
@config {
  --spacing: 1px; /* Generic token */
}
```

**Configuration that works**:

```css
@config {
  --spacing-4: 1rem; /* Individual tokens */
  --spacing-6: 1.5rem;
}
```

## Reproduction Steps

1. **Clone and install**:

   ```bash
   git clone <this-repo>
   pnpm install
   ```

2. **Build v3 (working baseline)**:

   ```bash
   cd packages/v3
   npm run build
   ```

3. **Build v4 (demonstrates issues)**:

   ```bash
   cd packages/v4
   npm run build
   ```

4. **Compare outputs**: Check `dist/` directories for differences between configurations.

## Test Cases

Both versions include systematic test cases:

| Configuration       | Prefix | Spacing Type      | v3 Status | v4 Status         |
| ------------------- | ------ | ----------------- | --------- | ----------------- |
| `base-multiple`     | None   | Individual tokens | ✅ Works  | ✅ Works          |
| `prefixed-multiple` | `tw-`  | Individual tokens | ✅ Works  | ❌ CSS var errors |

_Note: Single/generic spacing token tests removed as they don't generate logical classes in either version._

## Root Cause Analysis

The issues stem from `tailwindcss-logical` plugin's incompatibility with Tailwind CSS v4's architectural changes:

### 1. **CSS Variable System**

- **v3**: Uses direct values (`margin-inline-start: 4px`)
- **v4**: Uses CSS variables (`var(--tw-spacing-4)`)
- **Plugin issue**: References unprefixed variables (`var(--spacing)`)

### 2. **Prefix Implementation**

- **v3**: Prefixes applied at class name level (`.tw-mis-4`)
- **v4**: Prefixes applied to CSS variables (`--tw-spacing-4`)
- **Plugin issue**: Doesn't adapt variable references to prefixed versions

### 3. **Spacing Token Structure**

- **v3**: Flexible spacing configuration support
- **v4**: Requires specific token naming patterns
- **Plugin issue**: Only works with individual tokens, not generic ones

## Impact

- **Breaking change** for users migrating from v3 to v4 with prefixes
- **Reduced functionality** with generic spacing configurations
- **CSS runtime errors** due to undefined variable references

## Environment

- `tailwindcss`: `3.4.17` (v3), `4.1.10` (v4)
- `tailwindcss-logical`: `3.0.1` (v3), `4.0.0` (v4)
- Node.js: Latest LTS
