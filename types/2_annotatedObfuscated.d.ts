declare namespace ObfuscatedAnnotated {
  /* We first define a synonym for never, which will come up a few times later. */
  type Ѻ = never;

  /* -- Define boolean logic -- */
  /* Our first obfuscation technique is simple:
   * [explain JS rules]
   * Here, we use only round Unicode chars that look like an "O". */
  type ⵔ = "ⵔ";
  type 〇 = "〇";
  type O = 〇 | ⵔ;

  /* Our second obfuscation technique is a bit subtler.
   * It's fine for parameter types named in generic type clauses to shadow top-level types,
   * as long as those types aren't used in the type definition.
   * So, we can heavily abuse this technique by naming all parameter types after top level types,
   * to reduce the necessary number of identifiers to only those needed for top-level types. */
  type o<ⵔ extends O, ᴏ, ᦞ> = {
    〇: ᦞ;
    ⵔ: ᴏ;
  }[ⵔ];
  type ᴏ<ᦞ extends O> = o<ᦞ, 〇, ⵔ>;
  type ᦞ<ⵔ extends O, ᴏ extends O> = o<ⵔ, ᴏ, 〇>;

  /* -- Define the Peano numbers -- */
  /* It doesn't matter what Zero actually is,
   * so we simply make it a synonym for False. */
  type ଠ = 〇;
  type ᱛ<ଠ> = { ⵔ: ଠ };

  /* Here, we define the Peano numbers 1 through 10.
   * In the fully obfuscated version, we skip this and just define
   * 10 with Succ<>. */
  type _1 = ᱛ<ଠ>;
  type _2 = ᱛ<_1>;
  type _3 = ᱛ<_2>;
  type _4 = ᱛ<_3>;
  type _5 = ᱛ<_4>;
  type _6 = ᱛ<_5>;
  type _7 = ᱛ<_6>;
  type _8 = ᱛ<_7>;
  type _9 = ᱛ<_8>;
  type _10 = ᱛ<_9>;

  /* -- Define numerical comparion -- */
  type Ⲟ<ᦞ> = ᦞ extends ଠ ? ⵔ : 〇;

  type ⲟ<Ⲟ, ᴏ> = Ⲟ extends ᱛ<infer ᦞ>
    ? ᴏ extends ᱛ<infer o>
      ? ⲟ<ᦞ, o>
      : 〇
    : ᴏ extends ଠ
    ? ⵔ
    : 〇;

  type О<ᦞ, ᴏ> = ᴏ extends ᱛ<infer o>
    ? ᦞ extends ᱛ<infer Ⲟ>
      ? О<Ⲟ, o>
      : ⵔ
    : 〇;

  type о<ⵔ, 〇> = ᴏ<О<ⵔ, 〇>>;

  /* -- Define some arithmetic -- */
  type ο<ⵔ, 〇> = 〇 extends ᱛ<infer Ⲟ>
    ? ⵔ extends ᱛ<infer О>
      ? ο<О, Ⲟ>
      : ଠ
    : ⵔ;

  type Ο<ⵔ, 〇> = 〇 extends ᱛ<infer _>
    ? ⵔ extends ᱛ<infer _>
      ? o<о<ⵔ, 〇>, Ο<ο<ⵔ, 〇>, 〇>, ⵔ>
      : ଠ
    : Ѻ;

  /* -- Define linked lists & basic list operations -- */
  /* Around here, we begin running out of O's, and have
   * to start including diacritics. This gets us enough O's
   * to finish the program. */
  type ѻ = { ⵔ: ⵔ };
  type ϙ = { ⵔ: 〇; 〇: any; ଠ: Ϙ };
  type Ϙ = ѻ | ϙ;

  type Ό<ⵔ, o extends Ϙ> = { ⵔ: 〇; 〇: ⵔ; ଠ: o };
  type ό<ⵔ extends ϙ> = ⵔ["〇"];
  type ȱ<ⵔ extends Ϙ> = ⵔ extends ϙ ? ⵔ["ଠ"] : ѻ;
  type Ȱ<ⵔ extends Ϙ> = ⵔ["ⵔ"];

  type ȯ<ⵔ extends Ϙ> = Ȯ<ⵔ, ѻ>;
  type Ȯ<ⵔ extends Ϙ, 〇 extends Ϙ> = {
    〇: ⵔ extends ϙ ? Ȯ<ȱ<ⵔ>, Ό<ό<ⵔ>, 〇>> : Ѻ;
    ⵔ: 〇;
  }[Ȱ<ⵔ>];

  /* -- Define a method to filter out all items of a linked list
   * divisible by a certain number. -- */
  type Ó<ⵔ extends Ϙ, 〇> = ⵔ extends ϙ
    ? ȱ<ⵔ> extends ϙ
      ? o<ᦞ<Ⲟ<Ο<ό<ⵔ>, 〇>>, ᴏ<ⲟ<ό<ⵔ>, 〇>>>, Ó<ȱ<ⵔ>, 〇>, Ό<ό<ⵔ>, Ó<ȱ<ⵔ>, 〇>>>
      : o<Ⲟ<Ο<ό<ⵔ>, 〇>>, ѻ, ⵔ>
    : Ѻ;

  /* -- Define a method to generated a list of numbers from X
   * down to 1, then immediately call it, reverse it,
   * and drop the first element. This gets us 2...10. -- */
  type ó<ⵔ> = {
    〇: ⵔ extends ᱛ<infer 〇> ? Ό<ⵔ, ó<〇>> : Ѻ;
    ⵔ: ѻ;
  }[Ⲟ<ⵔ>];
  type Ò = ȱ<ȯ<ó<_10>>>;

  /* -- Now, we execute the Sieve of Eratosthenes for two passes,
   * using the list of numbers 2..10 and the filter method defined earlier. -- */
  type ò = Ó<Ò, ό<Ò>>;
  type Ö = Ó<ò, ό<ȱ<ò>>>;

  /* -- The result is a list of the prime numbers from 2 to 10!
   * Sadly, we can't go any further because Typescript yells at me about
   * excessively deep nested types. -- */
  export type ஃ = Ö;
}
