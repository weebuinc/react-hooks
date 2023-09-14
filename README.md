# Weebu React Hooks

This is a collection of very useful hooks provided by our company `Weebu Inc.`.

## Getting Started

<br/>

### Install Weebu's React Hooks

```
npm install @weebuinc/react-hooks
```

### Import the Hooks into your Project

```typescript
import axios from 'axios';
import { useState } from 'react';
import { useDebounce } from '@weebuinc/react-hooks';

export function SearchInput() {
  const [value, setValue] = useState('');
  const [names, setNames] = useState(new Array<string>());

  const search = useDebounce(async (name: string) => {
    // this logic will be called 300ms after the last dispatch of the search function
    const { data } = await axios.get('http://api.example.com/search', { params: { name } });
    setNames([...data]);
  });

  return (
    <div>
      <input
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          search(ev.target.value);
        }}
      />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

<br/>

## Available Hooks

Below are brief description of our available hooks. <br/>

### useClosure

The closure hook returns a reference that updates, automatically, by the dependencies passed to it.

It can be thought as a combination of the `useRef` and `useMemo` hooks.   Where the object returned by `useClosure` is a reference that is constantly updated based on the changes of the dependencies.

```typescript
import { useEffect, useState } from 'react';
import { useClosure } from '@weebuinc/react-hooks';

export function MyComponent({ onChange, listenToChange = false }) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('');

  const closure = useClosure(() => ({ listenToChange, mounted }), [listenToChange, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // closure allows us to get the latest states of listenToChange and mounted without reacting to their state change.
    if (closure.current.listenToChange || closure.current.mounted) {
      onChange(value);
    }
  }, [value]);

  return (
    <input value={value} onChange={(ev) => setValue(ev.target.value)} />
  )
}
```

### useDebounce

The debounce hook takes in a callback function and returns a dispatch function that debounces the callback.

```typescript
import axios from 'axios';
import { useState } from 'react';
import { useDebounce } from '@weebuinc/react-hooks';

export function SearchInput() {
  const [value, setValue] = useState('');
  const [names, setNames] = useState(new Array<string>());

  const search = useDebounce(async (name: string) => {
    // this logic will be called 300ms after the last dispatch of the search function
    const { data } = await axios.get('http://api.example.com/search', { params: { name } });
    setNames([...data]);
  });

  return (
    <div>
      <input
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          search(ev.target.value);
        }}
      />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### usePatch

The patch hook allows an object state to have some (or all) of its fields to be changed by the dispatch setter.

```typescript
import { usePatch } from '@weebu/react-hooks';

export function MyComponent() {
  // allows for the firstName to be changed without affecting the lastName and vice versa
  const [patch, setPatch] = usePatch({ firstName: '', lastName: '' });
  return (
    <>
      <input
        name='firstName'
        value={patch.firstName}
        onClick={(ev) => setPatch({ firstName: ev.target.value })}
      />
      <input
        name='lastName'
        value={patch.lastName}
        onClick={(ev) => setPatch({ lastName: ev.target.value })}
      />
    </>
  );
}
```