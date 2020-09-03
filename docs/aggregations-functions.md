## first

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

## firstOrDefault

Works like first, but doesn't throw exception, it returns null like default result.

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

## lastOrDefault

## elementAt

## elementAtOrDefault

## min

## max

## any

## all

## contains

## sum

## average

## count

## aggregate
