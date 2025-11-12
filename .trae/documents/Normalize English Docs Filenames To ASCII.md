## Findings
- A total of 113 paths under `content/docs/en` still contain Chinese segments.
- Concentrated in:
  - `base/lang` (rust, python, cpp, compile) — 70
  - `base/dsa/leetcode` — 20
  - `base/math` — 17
  - `base/cs/web` — 6
- Clear one-to-one mappings exist to your zh-cn English structure (e.g., `字符串相关/回文串` → `string-related/palindromes.mdx`, `模块和编译/编译` → `modules-and-compilation/compilation.mdx`, `二维空间` → `two-dimensional-space.mdx`).

## Plan
1. Web (base/cs/web)
- Rename remaining Chinese-named files in `ip-layer` and `mac-layer` to ASCII: `网络设备` → `network-devices.mdx`, `路由器原理` → `router-principles.mdx`, `网络IP地址和IP数据报` → `ip-addresses-and-ip-datagrams.mdx`, `介质访问控制和帧` → `media-access-control-and-frames.mdx`, `LAN和以太网` → `lan-and-ethernet.mdx`, `物理信道传输原理和静态复用` → `physical-channel-transmission-and-static-multiplexing.mdx`.

2. DSA/Leetcode (base/dsa/leetcode)
- Rename directory segments to ASCII (`动态规划` → `dynamic-programming`, `双指针相关` → `two-pointers`, `字符串相关` → `string-related`, `数组相关` → `array-related`, `栈相关` → `stack-related`, `树相关` → `tree-related`, `递归` → `recursion`).
- Rename files using the already-established zh-cn English filenames (e.g., `最大子数组和` → `maximum-subarray.mdx`, `二分查找` → `binary-search.mdx`).

3. Math (base/math)
- Discrete mathematics: convert `集合论` → `set-theory.mdx`, `逻辑和命题演算` → `logic-and-propositional-calculus.mdx`, `形式语言和自动机` → `formal-languages-and-automata.mdx`, `概论` → `overview-zh.mdx`.
- Space: `二维空间` → `two-dimensional-space.mdx`, `三维空间` → `three-dimensional-space.mdx`.
- Calculus: convert nested `积分学/*` to `integral-calculus/*` and rename `函数` → `functions.mdx`, `微分学` → `differential-calculus.mdx`, `微分方程` → `differential-equations.mdx`, `级数` → `series.mdx`.

4. Languages (base/lang)
- Rust: rename Chinese directory segments (`变量和声明`, `数据类型`, `模块和编译`, `表达式和函数`, `错误处理`, `面向对象`, `多线程`) and files to ASCII matching zh-cn mappings (e.g., `变量和常量` → `variables-and-constants.mdx`).
- Python: rename `数据类型` → `data-types` and `函数和模块` → `functions-and-modules`, `面向对象` → `object-oriented`, etc.
- C++: rename `面向对象`, `表达式和函数`, `模板和泛型`, `模块和编译`, `标准库和STL`, `变量和声明`, plus `io/网络` → `io/network`.
- Compile: rename `概述`, `编译`, `自动机`, `词法分析`, `语义分析`, `语法分析与文法`, `语法树` to their ASCII equivalents.

5. Slug and collisions
- Keep content titles and frontmatter; only change paths.
- Where an ASCII filename already exists (e.g., `overview.mdx`), rename the Chinese one to `overview-zh.mdx` to avoid conflicts.

6. Verification
- Rebuild (`next dev`) and verify doc routes resolve with `source.getPage` i18n dir parser unchanged.
- Spot-check internal links in MDX; update only if broken (most links use relative links and should remain valid).

## Outcome
- All `content/docs/en` filenames and directory segments become ASCII-only.
- URL paths become consistent across locales.
- No content changes, only path normalization.

## Approval
- Confirm to proceed with renaming the listed sections and files. After approval, I will carry out the changes and verify routes.