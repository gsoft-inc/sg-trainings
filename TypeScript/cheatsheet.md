<div align="center">
<h1>Cheetsheet TypeScript</h1>

<img
  height="90"
  width="90"
  alt="react + ts logo"
  src="https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png"
  align="left"
/>

<p>Des exemples du codebase de Apricot</p>

</div>

---

<div align="center">

:wave: La formation est donné par @alexandre.asselin et @macadam. N'hésitez pas à les poker sur Slack si vous avez des questions ou commentaires. :+1:

</div>

---


### Cheatsheet Table of Contents

- [Section 1: TypeScript](#typescript)
  - [Type Union](#type-union)
  - [Nullable](#nullable)
  - [Type vs Interface](#type-vs-interface)
  - [Optional parameters](#optional-parameters)
  - [Function declaration](#function-declaration)
  - [Enum Types](#enum-types)
  - [Type Assertion](#type-assertion)
- [Section 2: TypeScript React](#typescript-react)
  - [Function Component without props](#function-component-without-props)
  - [Function Component with props](#function-component-with-props)
  - [Optional Types](#optional-types)
  - [defaultProps](#defaultprops)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useRef](#useref)
  - [Custom Hooks](#custom-hooks)
- [Section 3: TypeScript Redux (WORK IN PROGRESS)](#typescript-redux-work-in-progress)
  - [Useful Types](#useful-types)
  - [useSelector](#useselector)
  - [useDispatch](#usedispatch)  
  - [actions.ts](#actionsts)
  - [reducers.ts](#reducersts)
  - [selectors.ts](#selectorsts)
  - [selectors.ts with reselect](#selectorsts-with-reselect)  
  - [handlers.ts](#handlersts)

## TypeScript

### Type Union

```tsx
type randomUnion = string | number | boolean;
```

### Nullable

```tsx
function(nullableValue: number | null) {
}
```

### Type vs Interface
Use type when you might need a union or intersection:

```tsx
type Foo = number | { someProperty: number }
```

Use interface when you want extends or implements e.g

```tsx
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```

Otherwise use whatever makes you happy that day.

### Optional parameters

If a function has an optional parameters, assign default value.

```tsx
function add(a: number, b = 2) { // b can be infered since we give it a number default value
    return a + b;
}

function add(a: number, b:number = 2) {
    return a + b;
}
```
### Function declaration 
Return type should not be specified unless TypeScript forces you to.

```tsx

// Return type is optional
function add (a: number, b: number)  {
  return a + b
}

function add (a: number, b: number): number {
  return a + b
}

```
### Enum Types

Enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```tsx
export enum ButtonSizes {
  default = "default",
  small = "small",
  large = "large"
}
```

Usage:

```tsx
function MyComponent() {
  return <Button size={ButtonSizes.default} />;
}
```

A simpler alternative to enum is just declaring a bunch of strings with union:

```tsx
export declare type Position = "left" | "right" | "top" | "bottom";
```

This is handy because TypeScript will throw errors when you mistype a string for your props.

### Type Assertion

Sometimes you know better than TypeScript that the type you're using is narrower than it thinks, or union types need to be asserted to a more specific type to work with other APIs, so assert with the `as` keyword. This tells the compiler you know better than it does.

```tsx
interface MyComponentProps {
  message: string | SpecialMessageType
}

function MyComponent({ message }: MyComponentProps) {
  return (
      <Component2 message={message as SpecialMessageType}>{message}</Component2>
    );
}
```

Note that you cannot assert your way to anything - basically it is only for refining types. Therefore it is not the same as "casting" a type.

You can also assert a property is non-null, when accessing it:

```ts
element.parentNode!.removeChild(element) // ! before the period
myFunction(document.getElementById(dialog.id!)! // ! after the property accessing
let userID!: string // definite assignment assertion... be careful!
```

Of course, try to actually handle the null case instead of asserting :)

## TypeScript React

### Function Component without props
```tsx
import  React from "react";

export const MyComponent = () => {
  return (
    <div> Hello World! </div>
  );
}

export function MyComponent2() {
  return (
    <div> Hello World! </div>
  );
}

```

### Function Component with props
 
```tsx
import  React from "react";

interface MyComponentProps {
  title: string,
  age?: number,
}

export const MyComponent = ({ title, age = 10 }: MyComponentProps) => {
  return (
    <div> Hello World! </div>
  );
}

export function MyComponent2({ title, age = 10 }: MyComponentProps) {
  return (
    <div> Hello World! </div>
  );
}

```

### Optional Types

If a component has an optional prop, add a question mark and assign during destructure.

```tsx
interface MyComponentProps {
  message?: string,
}

function MyComponent({ message = "default" }: MyComponentProps) {
  return <div>{message}</div>;
}
```

### defaultProps
we use the ES6 destructuring syntax now instead of default Props

```tsx
import  React from "react";

interface MyComponentProps {
  age?: number,
}

export const MyComponent = ({ age = 10 }: MyComponentProps) => {
  return (
    <div> Hello World! </div>
  );
}

export function MyComponent2({ age = 10 }: MyComponentProps) {
  return (
    <div> Hello World! </div>
  );
}

```

### useState

Type inference works very well most of the time:

```tsx
const [val, toggle] = useState(false); // `val` is inferred to be a boolean, `toggle` only takes booleans
```

See also the [Using Inferred Types](#using-inferred-types) section if you need to use a complex type that you've relied on inference for.

However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:

```tsx
const [user, setUser] = useState<IUser | null>(null);

// later...
setUser(newUser);
```

### useEffect

When using `useEffect`, take care not to return anything other than a function or `undefined`, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:

```ts
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;
  // bad! setTimeout implicitly returns a number because the arrow function body isn't wrapped in curly braces
  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  return null;
}
```

### useRef

When using `useRef`, you have two options when creating a ref container that does not have an initial value:

```ts
const ref1 = useRef<HTMLElement>(null);
const ref2 = useRef<HTMLElement | null>(null);
```

The first option will make `ref1.current` read-only, and is intended to be passed in to built-in `ref` attributes that React will manage (because React handles setting the `current` value for you).

The second option will make `ref2.current` mutable, and is intended for "instance variables" that you manage yourself.

```tsx
function TextInputWithFocusButton() {
  // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      {/* in addition, inputEl only can be used with input elements. Yay! */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### Custom Hooks

If you are returning an array in your Custom Hook, you will want to avoid type inference as Typescript will infer a union type (when you actually want different types in each position of the array). 

If you are returning an array in your Custom Hook, you will want to avoid letting Typescript infer the return type. if you don't add the `as const` after returning your array, TypeScript will infer the return type `(boolean | Promise<any>)[]`


```tsx
export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

## TypeScript Redux (WORK IN PROGRESS)

### Useful Types

When writing Redux actions/reducers/handlers, you will most likely use the following types : 

1. **AppState:** AppState represents the all the state in the redux store. Since we have no way for now to create a type representing all the state, **AppState** is equal to **any**. AppState is declared in src/app/@types/global.d.ts, and does not need to be imported in a file to be used (it is declared globally)

2. **Action:** Action is the type returned by the action builder. It contains a `type` and a `payload` and other properties used by middlewares. It is imported from the core : `import { Action } from "@core/redux"`.

3. **ActionPayload:** ActionPayload is another alias for **any**. We don't have a way for now to associate the right action payload type with the action type.

### useSelector

if you use a selector inside the useSelector, there is no changes to the synthax
```tsx
const isRequestLoading = useSelector(state => isApiRequestLoadingSelector(actionTypes, state));
```

If you don't have a selector for your slice of state, we recommend a selector that returns the slice of state, typed
```tsx
const tenantActivity = useSelector(state => getDashboard(state).tenantActivity);
```

### useDispatch

No changes in the useDispatch.

```tsx
const dispatch = useDispatch();
```

if you ever need the type of the dispatch, you can import it like this : `import { dispatch } from "redux"`


### actions.ts

Only a small changes in actions.ts files. You now need to type the input parameters of the function that creates the action.

```tsx 
import { action } from "@core/redux";
import { TILE_TYPE } from "@contracts/api/dashboard/enums";

const NAMESPACE = "[dashboard.dashboard-page]";

export const DISMISS_TILE = `${NAMESPACE} DismissTile`;

export const dismissUserTileDashboard = (tileType: TILE_TYPE) =>
    action(DISMISS_TILE)
        .payload({
            tileType
        })
        .command({ url: "/dashboard/dismiss-user-tile" })
        .mixpanel(MIXPANEL_EVENT_NAME.buttonClicked, {
            [MIXPANEL_PROPERTY.buttonName]: MIXPANEL_VALUE.dismiss,
            [MIXPANEL_PROPERTY.source]: getToDoTileTelemetrySource(tileType)
        })
        .build();
```

### reducers.ts

```tsx
import { ActionPayload, createReducer } from "@core/redux";
import { RegistrationContext } from "@core/registration";
import { ReviewStatus, TileType } from "@contracts/api/dashboard/enums";
import { USER_TILE_DISMISSED_EVENT } from "@contracts/api/dashboard/events";

export interface DashboardState {
    showWelcome: boolean;
    isInitialCrawlCompleted: boolean;
    isInitialExternalSharingCrawlCompleted: boolean;
    isLocked: boolean;
    lockStateInfo?: {
        isLocked: boolean;
    };
    tenantStatistics?: {
        orphanedUsersCount: number;
    };
    tenantActivity?: {
        activityCount: number;
    };
    externalLinksReviewOverview?: {
        reviewStatus: ReviewStatus;
    };
    tiles: {
        tileType: TileType;
        isDismissed: boolean;
    }[];
}


const INITIAL_STATE: DashboardState = {
    showWelcome: true,
    isInitialCrawlCompleted: false,
    isInitialExternalSharingCrawlCompleted: false,
    isLocked: false,
    tiles: []
};


function dismissUserTile(state: DashboardState, payload: ActionPayload) {
    state.tiles.forEach(tile => {
        if(tile.tileType === payload.tileType) {
            tile.isDismissed = true;
        }
    });
}

const reducer = {
    dashboard: createReducer(INITIAL_STATE, {
        [USER_TILE_DISMISSED_EVENT]: dismissUserTile
    })
};

export function registerReducers(registrationContext: RegistrationContext) {
    registrationContext.registerReducer(reducer);
}
```

### selectors.ts

```tsx
import { DashboardState } from "./reducers";

const getDashboardState = (state: AppState): DashboardState => {
    return state.dashboard;
};

export const getTiles = (state: AppState) => {
    return getDashboardState(state).tiles;
};

```
OR
```tsx
export const getTiles = (state: AppState) => {
    return (state.dashboard as DashboardState).tiles;
};
```

### selectors.ts with reselect

```tsx
import { DashboardState } from "./reducers";
import { createSelector } from "reselect";

const getDashboardState = (state: AppState): DashboardState => {
    return state.dashboard;
};

export const getTiles = (state: AppState) => {
    return getDashboardState(state).tiles;
};

export const getVisibleTilesSelector = createSelector(
    [getTiles],
    tiles => {
        return tiles.filter(x => x.isDismissed === false);
    }
);
```

### handlers.ts

```tsx
import { Action } from "@core/redux";
import { Dispatch } from "redux";
import { HANDLER_TYPE } from "@core/redux/handlers";
import { LOCATION_CHANGE } from "connected-react-router";
import { RegistrationContext }from "@core/registration/internal";
import { trackMixpanelLocationChange } from "./actions";

const BLACKLIST = ["/"];

function handleMixpanelLocationChange(dispatch: Dispatch, action: Action, getState: () => AppState) {
    if (action.type === LOCATION_CHANGE) {
        const { pathname: url } = action.payload.location;
        const { router } = getState();
        const { pathname: previousUrl } = router.location;

        if (BLACKLIST.indexOf(url) === -1 || BLACKLIST.indexOf(previousUrl) === -1) {
            dispatch(trackMixpanelLocationChange(url, previousUrl));
        }
    }
}

export function registerHandlers(registrationContext: RegistrationContext) {
    registrationContext.registerHandler(handleMixpanelLocationChange, HANDLER_TYPE.beforeReducers);
}
```
