# Materializing Methods

Materializing methods trigger computation of your query. All your chain of methods will be runned for taking result.

* [toArray](#toArray)

## toArray

Method signature: `toArray(): T[]`.

Creates an array from collection

```typescript
const concated = _([1, 2, 3).toArray();

console.log(concated); // [ 1, 2, 3, ]
```
