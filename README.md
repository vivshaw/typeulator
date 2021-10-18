# typeulator
### Obfuscated typelevel math in TypeScript to implement the Sieve of Eratosthenes

This repo implements in TypeScript a simple, ages-old algorithm for finding primes- the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes). However, I've chosen to implement this at the type level, rather than the value level- and then to obfuscate the heck out of it!

Three variants are provided:
* [`1_deobfuscated.d.ts`](types/1_deobfuscated.d.ts) is the non-obfuscated version of the algorithm. Review this if you just want to see how it works.
* [`2_annotatedObfuscated.d.ts`](types/2_annotatedObfuscated.d.ts) is partially obfuscated, with comments describing the obfuscation techniques being applied. review this if you want to learn a thing or two about obfuscation techniques available in TypeScript.
* [`3_obfuscated.d.ts`](types/3_obfuscated.d.ts) is the fully obfuscated version. Review this if you want to get a migraine.

### Credit where credit is due

Thanks to:

* [@YBogomolov](https://github.com/YBogomolov) and his [talk on type-level programming in Typescript](https://github.com/YBogomolov/talk-typelevel-ts)
* [@majjoha](https://github.com/majjoha) and his [blog post on the same topic](https://mjj.io/2021/03/29/type-level-programming-in-typescript/)
* [@mathiasbynens](https://github.com/mathiasbynens) and his [notes on permitted JavaScript identifiers](https://mathiasbynens.be/notes/javascript-identifiers-es6)
