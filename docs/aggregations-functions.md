# Aggregation Methods

* [first](#first)
* [last](#last)
* [elementAt](#elementAt)

## first

Method signature: `first(predicate?: (item: T) => boolean): T`

Returns first element at collection.

```typescript
const first = _([1, 3, 7, 3, 2, 4, 7, 8]).first();

console.log(first); // 1
```

> ⚠️ If collection has got no one element this method throws '**No matches found**'

Can be used with condition:

```typescript
const firstByCondition = _([1, 3, 7, 3, 2, 4, 7, 8]).first(item => item > 3);

console.log(firstByCondition); // 7
```

### firstOrDefault

Method signature: `firstOrDefault($default?: T | null, predicate?: (item: T) => boolean): T | null`

Works like `first`, but doesn't throw exception, it returns null like default result.

```typescript
const first = _([]).firstOrDefault();

console.log(first); // null
```

Default result can be overrided:

```typescript
const firstWithDefault = _([]).firstOrDefault(0);

console.log(firstWithDefault); // 0
```

You can use this method with condition too:

```typescript
const firstWithDefault = _([3, 4, 6, 3, 2 ,5]).firstOrDefault(0, item => item > 777);

console.log(firstWithDefault); // 0
```

## last

Method signature: `last(predicate?: (item: T) => boolean): T`

Returns last element at collection.

```typescript
const last = _([1, 3, 7, 3, 2, 4, 7, 8]).last();

console.log(last); // 8
```

> ⚠️ If collection has got no one element this method throws '**No matches found**'

Can be used with condition:

```typescript
const lastByCondition = _([1, 3, 7, 3, 2, 4, 7, 8]).last(item => item < 3);

console.log(lastByCondition); // 2
```

### lastOrDefault

Method signature: `lastOrDefault($default?: T | null, predicate?: (item: T) => boolean): T | null`

Works like `last`, but doesn't throw exception, it returns null like default result.

```typescript
const last = _([]).lastOrDefault();

console.log(last); // null
```

Default result can be overrided:

```typescript
const lastWithDefault = _([]).lastOrDefault(0);

console.log(lastWithDefault); // 0
```

You can use this method with condition too:

```typescript
const lastWithDefault = _([3, 4, 6, 3, 2 ,5]).lastOrDefault(0, item => item < 0);

console.log(lastWithDefault); // 0
```

## elementAt

Method signature: `elementAt(position: number): T;`

Returns element at specified index at collection.

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAt(3)

console.log(el); // 4
```

> ⚠️ If collection hasn't got element at specified index - method throws '**No matches found**'

### elementAtOrDefault

Method signature: `elementAtOrDefault(position: number, $default?: T): T | null;`

Works like `elementAt`, but doesn't throw exception, it returns null like default result.

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAtOrDefault(10)

console.log(el); // null
```

Default result can be overrided:

```typescript
const el = _([1, 2, 3, 4, 5, 6, 7]).elementAtOrDefault(10, 0)

console.log(el); // 0
```

## min

## max

## any

## all

## contains

## sum

## average

## count

## aggregate
