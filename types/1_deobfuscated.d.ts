declare namespace PeanoPrimes {
  /* -- Define boolean logic -- */
  type True = "true";
  type False = "false";
  type Bool = False | True;

  type If<P extends Bool, Then, Else> = {
    false: Else;
    true: Then;
  }[P];
  type Not<P extends Bool> = If<P, False, True>;
  type And<P extends Bool, Q extends Bool> = If<P, Q, False>;

  /* -- Define the Peano numbers -- */
  type _0 = "0";
  type Succ<Prev> = { prev: Prev };

  type _1 = Succ<_0>;
  type _2 = Succ<_1>;
  type _3 = Succ<_2>;
  type _4 = Succ<_3>;
  type _5 = Succ<_4>;
  type _6 = Succ<_5>;
  type _7 = Succ<_6>;
  type _8 = Succ<_7>;
  type _9 = Succ<_8>;
  type _10 = Succ<_9>;

  /* -- Define numerical comparion -- */
  type IsZero<N> = N extends _0 ? True : False;

  type Equals<X, Y> = X extends Succ<infer PrevX>
    ? Y extends Succ<infer PrevY>
      ? Equals<PrevX, PrevY>
      : False
    : Y extends _0
    ? True
    : False;

  type LessThan<X, Y> = Y extends Succ<infer PrevY>
    ? X extends Succ<infer PrevX>
      ? LessThan<PrevX, PrevY>
      : True
    : False;

  type GreaterThanEq<X, Y> = Not<LessThan<X, Y>>;

  /* -- Define some arithmetic -- */
  type Subtract<X, Y> = Y extends Succ<infer PrevY>
    ? X extends Succ<infer PrevX>
      ? Subtract<PrevX, PrevY>
      : _0
    : X;

  type Remainder<X, Y> = Y extends Succ<infer _>
    ? X extends Succ<infer _>
      ? If<GreaterThanEq<X, Y>, Remainder<Subtract<X, Y>, Y>, X>
      : _0
    : never;

  /* -- Define linked lists & list operations -- */
  type Nil = { isNil: True };
  type ListNode = { isNil: False; car: any; cdr: LinkedList };
  type LinkedList = Nil | ListNode;

  type Cons<Car, Cdr extends LinkedList> = { isNil: False; car: Car; cdr: Cdr };
  type Car<Lst extends ListNode> = Lst["car"];
  type Cdr<Lst extends LinkedList> = Lst extends ListNode ? Lst["cdr"] : Nil;
  type IsNil<Lst extends LinkedList> = Lst["isNil"];

  type Reverse<Lst extends LinkedList> = ReverseInternal<Lst, Nil>;
  type ReverseInternal<Lst extends LinkedList, Reversed extends LinkedList> = {
    false: Lst extends ListNode
      ? ReverseInternal<Cdr<Lst>, Cons<Car<Lst>, Reversed>>
      : never;
    true: Reversed;
  }[IsNil<Lst>];

  /* -- Define a method to filter out all items of a linked list
   * divisible by a certain number. -- */
  type FilterDivisible<Xs extends LinkedList, X> = Xs extends ListNode
    ? Cdr<Xs> extends ListNode
      ? If<
          And<IsZero<Remainder<Car<Xs>, X>>, Not<Equals<Car<Xs>, X>>>,
          FilterDivisible<Cdr<Xs>, X>,
          Cons<Car<Xs>, FilterDivisible<Cdr<Xs>, X>>
        >
      : If<IsZero<Remainder<Car<Xs>, X>>, Nil, Xs>
    : never;

  /* -- Define a method to generated a list of numbers from X
   * down to 1, then immediately call it, reverse it,
   * and drop the first element. This gets us [2...10]. -- */
  type XToOne<X> = {
    false: X extends Succ<infer SX> ? Cons<X, XToOne<SX>> : never;
    true: Nil;
  }[IsZero<X>];
  type TwoToTen = Cdr<Reverse<XToOne<_10>>>;

  /* -- Now, I execute the Sieve of Eratosthenes for two passes,
   * using the list of numbers [2..10] and the filter method defined earlier. -- */
  type FirstPass = FilterDivisible<TwoToTen, Car<TwoToTen>>;
  type SecondPass = FilterDivisible<FirstPass, Car<Cdr<FirstPass>>>;

  /* -- The result is a list of the prime numbers from 2 to 10!
   * Sadly, we can't go any further because Typescript gives me
   * the dreaded `ts(2589)` (Type instantiation is excessively deep and possibly infinite.) -- */
  export type Result = SecondPass;
}
