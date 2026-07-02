/******************************************************************************
 * SEARCH FUNCTIONALITY
 ******************************************************************************

/*
 * Purpose:
 * --------
 * Allows users to search products by entering keywords.
 *
 * Why does this feature exist?
 * -----------------------------
 * On any e-commerce or listing page, the product catalog can grow to
 * hundreds or thousands of items. No user wants to scroll through all of
 * them to find what they need. Search gives the user a fast, self-service
 * way to narrow the list down to only what is relevant to them, which
 * directly improves usability and conversion.
 *
 * Workflow:
 * ---------
 * 1. User types text in the SearchBox component.
 * 2. The onChange event is triggered.
 * 3. SearchBox calls the handleSearch() function.
 * 4. handleSearch updates the searchText state using setSearchText().
 * 5. Updating state causes React to re-render the component.
 * 6. During re-render, useMemo executes again.
 * 7. Products are filtered based on the latest search text.
 * 8. Only matching products are displayed.
 *
 * Explaining each step for someone new to this code:
 * ----------------------------------------------------
 * - "onChange event" simply means: every time a key is pressed in the
 *   input box, the browser fires an event, and React lets us hook into it.
 * - "handleSearch" is just a plain JavaScript function we wrote; it's not
 *   special to React. Its only job is to take the new text and pass it to
 *   state.
 * - "setSearchText()" is the updater function React gives us when we call
 *   useState(). Calling it does two things: (a) it stores the new value,
 *   and (b) it tells React "something changed, please re-render."
 * - A "re-render" means React runs the component function again from top
 *   to bottom to figure out what the UI should look like now.
 *
 * React Hook Used:
 * ----------------
 * useState()
 *
 * Why useState?
 * -------------
 * - Stores the current search text.
 * - Automatically updates the UI whenever the value changes.
 * - Why not just use a normal JavaScript variable instead? Because a plain
 *   variable does not survive re-renders and does not trigger React to
 *   update the screen. useState is what "connects" a piece of data to the
 *   UI so that changing the data automatically changes what's on screen.
 *
 * Search Logic:
 * -------------
 * filter() iterates through every product.
 *
 * Each product is checked against:
 *   • Product Name
 *   • Product Description
 *
 * If either field contains the search keyword,
 * the product is included in the filtered list.
 *
 * Why check both name AND description?
 * -------------------------------------
 * Users don't always remember the exact product name. Someone might type
 * "wireless" hoping to find a "Bluetooth Mouse" whose description mentions
 * "wireless connectivity." Searching both fields makes search feel smarter
 * and more forgiving, which reduces "no results found" frustration.
 *
 * Example:
 * --------
 * Search Text : "React"
 *
 * Products:
 *   React Sticker        ✓ Included
 *   Java Sticker         ✗ Excluded
 *   Mouse Pad            ✗ Excluded
 */

/******************************************************************************
 * useMemo OPTIMIZATION
 ******************************************************************************

/*
 * Purpose:
 * --------
 * Prevents unnecessary filtering and sorting on every component render.
 *
 * Why useMemo?
 * ------------
 * Filtering and sorting can be expensive operations,
 * especially when the product list becomes large.
 *
 * useMemo stores (memoizes) the previous result.
 *
 * Why does this matter in React specifically?
 * ---------------------------------------------
 * A React component re-renders for many reasons — not just because
 * searchText or selectedSort changed. For example, if a parent component
 * re-renders, or an unrelated piece of state in this same component
 * changes, the whole component function runs again. Without useMemo, the
 * filter() and sort() logic would re-run on EVERY one of those renders,
 * even when products/searchText/selectedSort haven't actually changed.
 * That's wasted CPU work the user never sees any benefit from.
 *
 * React recalculates the result ONLY when one of these dependencies changes:
 *
 *   • products
 *   • searchText
 *   • selectedSort
 *
 * Otherwise, React returns the previously cached result.
 *
 * How does React know when to recalculate?
 * -------------------------------------------
 * useMemo takes a dependency array as its second argument. On every
 * render, React compares each value in that array to its value from the
 * previous render (using a simple equality check). If all values are the
 * same, React skips re-running the function and just hands back the
 * cached value from last time. If even one value is different, it reruns
 * the calculation and caches the new result.
 *
 * Benefits:
 * ---------
 * ✓ Better Performance
 * ✓ Less CPU Usage
 * ✓ Faster UI Rendering
 *
 * A word of caution:
 * -------------------
 * useMemo is not free — it has its own small overhead (storing the
 * cached value and comparing dependencies). For cheap calculations on
 * small arrays, plain recalculation on every render is often fine.
 * useMemo earns its keep when the list is large or the calculation is
 * genuinely expensive (e.g. hundreds+ of items, complex filtering).
 */

/******************************************************************************
 * PRODUCT FILTERING
 ******************************************************************************

/*
 * filter() loops through every product.
 *
 * The search is case-insensitive.
 *
 * Why toLowerCase()?
 *
 * JavaScript compares strings case-sensitively.
 *
 * Example:
 *
 * "React" != "react"
 *
 * Therefore,
 *
 * Product Name:
 *     React Sticker
 *
 * becomes
 *
 *     react sticker
 *
 * User Input:
 *     React
 *
 * becomes
 *
 *     react
 *
 * Now both strings can be compared correctly.
 *
 * Why is case-insensitivity important for UX?
 * -----------------------------------------------
 * Real users don't think about capitalization when typing. If search were
 * case-sensitive, typing "react" would fail to find "React Sticker," and
 * the user would wrongly conclude the product doesn't exist. Normalizing
 * both sides to lowercase before comparing removes this whole class of
 * "works on my machine but not for the user" bugs.
 *
 * includes() checks whether the keyword exists
 * anywhere inside the product name or description.
 *
 * Why includes() instead of an exact match (===)?
 * ---------------------------------------------------
 * An exact match would require the user to type the ENTIRE product name
 * correctly, which is unrealistic. includes() allows partial, substring
 * matching, so typing just "stick" still finds "React Sticker." This is
 * what makes the search feel like a real search engine rather than a
 * rigid lookup.
 */

/******************************************************************************
 * SORT FUNCTIONALITY
 ******************************************************************************

/*
 * Purpose:
 * --------
 * Allows users to arrange products based on different criteria.
 *
 * Why offer sorting at all?
 * ----------------------------
 * Different users have different priorities. A budget-conscious shopper
 * wants "Price Low to High." Someone in a hurry to buy something reliable
 * wants "Popularity" (i.e., what everyone else is buying). Giving control
 * over the ordering lets each user optimize the list for their own
 * decision-making process, instead of forcing one fixed order on everyone.
 *
 * Available Options:
 *
 * 1. Popularity
 * 2. Price Low to High
 * 3. Price High to Low
 *
 * Workflow:
 * ---------
 * User selects an option from Dropdown.
 *
 * ↓
 *
 * handleSort() executes.
 *
 * ↓
 *
 * setSelectedSort() updates the state.
 *
 * ↓
 *
 * React re-renders the component.
 *
 * ↓
 *
 * useMemo executes again.
 *
 * ↓
 *
 * Products are sorted.
 *
 * ↓
 *
 * Updated list is displayed.
 *
 * Why store the sort choice in state instead of sorting immediately
 * and forgetting the choice?
 * ---------------------------------------------------------------------
 * Storing it in state (selectedSort) means the chosen option persists
 * across re-renders — for example, if the user also types a new search
 * term, the list stays sorted the way they picked, instead of resetting
 * back to a default order every time something else changes.
 */

/******************************************************************************
 * SORTING ALGORITHM
 ******************************************************************************

/*
 * JavaScript sort() accepts a comparison function.
 *
 * Comparator Rules:
 *
 * Negative Value
 * --------------
 * Item A comes before Item B.
 *
 * Positive Value
 * --------------
 * Item B comes before Item A.
 *
 * Zero
 * ----
 * Order remains unchanged.
 *
 * Why does sort() need a function instead of just sorting automatically?
 * ---------------------------------------------------------------------------
 * JavaScript's default sort() converts items to strings and sorts them
 * alphabetically — which is meaningless (and often wrong) for numbers
 * like price. Without a comparator, sorting [80, 5, 200] would produce
 * [200, 5, 80] because "200" < "5" < "80" alphabetically. Providing a
 * comparator function tells sort() exactly how to compare two products,
 * so numeric fields like price are compared numerically.
 *
 * Price Low to High:
 *
 *     a.price - b.price
 *
 * Example:
 *
 * 20
 * 50
 * 80
 *
 * Result:
 *
 * 20
 * 50
 * 80
 *
 * Why does "a.price - b.price" produce ascending order?
 * ----------------------------------------------------------
 * If a.price is smaller than b.price, the subtraction is negative, and a
 * negative result tells sort() "a comes first." So cheaper items
 * naturally bubble to the front of the list.
 *
 * Price High to Low:
 *
 *     b.price - a.price
 *
 * Result:
 *
 * 80
 * 50
 * 20
 *
 * This simply flips the subtraction, so the logic that used to push
 * cheaper items first now pushes pricier items first.
 *
 * Popularity:
 *
 * Products having higher popularity appear first.
 *
 * Why is popularity sorted "high first" by default, unlike price?
 * ---------------------------------------------------------------------
 * With price, users may want either direction (cheapest first for
 * budget shoppers, priciest first for premium shoppers), so both options
 * are offered explicitly. With popularity, there's usually only one
 * useful direction: showing the most popular/most trusted items first
 * acts like informal social proof and helps undecided users choose
 * faster.
 */

/******************************************************************************
 * PRODUCT RENDERING
 ******************************************************************************

/*
 * map() converts every product object
 * into a ProductCard component.
 *
 * Each ProductCard receives
 *
 * • Product Name
 * • Description
 * • Image
 * • Price
 * • Popularity
 *
 * key={product.productId}
 *
 * React uses this unique key
 * to efficiently update only
 * the modified components.
 *
 * Why does map() get used here instead of a for loop?
 * ---------------------------------------------------------
 * React expects a component to return JSX (UI elements), and map()
 * naturally transforms an array of data (products) into an array of UI
 * elements (ProductCard components) in one expression. A traditional
 * for loop would require manually pushing into an array first, which is
 * more verbose for the same result.
 *
 * Why does the `key` prop matter so much?
 * -------------------------------------------
 * When the list changes (e.g., after filtering or sorting), React needs
 * a way to tell which ProductCard is which between renders, so it can
 * reuse existing DOM elements instead of destroying and recreating all
 * of them from scratch. The key is that identifier. Using something
 * stable and unique like productId (rather than the array index) ensures
 * React doesn't get confused and mix up which card belongs to which
 * product — this avoids subtle UI bugs, especially when the list is
 * re-ordered by sorting.
 */

/******************************************************************************
 * COMPLETE EXECUTION FLOW
 ******************************************************************************

/*
 * Spring Boot API
 *        │
 *        ▼
 * Axios fetches product data
 *        │
 *        ▼
 * Products stored in React State
 *        │
 *        ▼
 * User types in SearchBox
 *        │
 *        ▼
 * searchText state updates
 *        │
 *        ▼
 * User selects sorting option
 *        │
 *        ▼
 * selectedSort state updates
 *        │
 *        ▼
 * React re-renders ProductListings
 *        │
 *        ▼
 * useMemo executes
 *        │
 *        ├── filter()
 *        │
 *        └── sort()
 *        │
 *        ▼
 * map()
 *        │
 *        ▼
 * ProductCard Components
 *        │
 *        ▼
 * Updated UI displayed
 *
 * Why walk through the whole flow end-to-end?
 * ------------------------------------------------
 * Each piece above (useState, useMemo, filter, sort, map) makes sense in
 * isolation, but the real value of this architecture is how cleanly they
 * chain together: data flows in one direction, from the backend, into
 * state, through derived calculations, and finally into rendered UI.
 * This is the core React mental model — "state in, UI out" — and once
 * it clicks, most React codebases start to look familiar regardless of
 * the specific feature.
 */

/******************************************************************************
 * CONCLUSION — MOCK INTERVIEW (Senior Frontend Interviewer, 20 YOE)
 ******************************************************************************

/*
 * Below is a set of questions a senior interviewer might ask about this
 * exact piece of code, along with strong sample answers. Use this to test
 * your own understanding — try answering before reading the given answer.
 *
 * Q1: Why did you choose useMemo here instead of just filtering and
 *     sorting directly in the render body?
 * A1: Filtering and sorting are derived computations from products,
 *     searchText, and selectedSort. Without useMemo, they would re-run on
 *     every render regardless of cause, including renders triggered by
 *     unrelated state changes. useMemo caches the result and only
 *     recomputes when one of the listed dependencies actually changes,
 *     which avoids redundant CPU work — especially valuable as the
 *     product list grows.
 *
 * Q2: What would happen if you forgot to include `selectedSort` in the
 *     useMemo dependency array?
 * A2: React would keep returning the memoized result from before
 *     selectedSort changed, so the UI would show a stale, incorrectly
 *     sorted list even though the user picked a new option. This is a
 *     classic "stale closure" bug — the memoized function would be using
 *     the OLD value of selectedSort captured from the first render.
 *
 * Q3: Why use `a.price - b.price` instead of something like
 *     `a.price > b.price`?
 * A3: The comparator passed to sort() must return a number, not a
 *     boolean — negative, zero, or positive — to indicate relative
 *     order. A boolean expression like a.price > b.price doesn't fit
 *     that contract properly and can produce inconsistent or browser-
 *     dependent sorting results. Subtraction naturally produces the
 *     signed number sort() expects.
 *
 * Q4: Is `key={product.productId}` really necessary? Why not use the
 *     array index as the key?
 * A4: Using the array index works only if the list never reorders or
 *     has items added/removed from the middle. Since this list is both
 *     filtered and sorted dynamically, indices shift constantly, which
 *     can cause React to misattribute state or DOM nodes between
 *     re-renders — leading to visual glitches like animations firing on
 *     the wrong card, or input state leaking between rows. A stable,
 *     unique ID like productId avoids all of that.
 *
 * Q5: How would you handle this same feature if the product list had
 *     100,000 items instead of a few dozen?
 * A5: I'd move filtering and sorting to the backend/API layer with
 *     pagination, since client-side filtering doesn't scale well past a
 *     few thousand items — the whole array would need to be sent to the
 *     browser first. I'd also consider debouncing the search input so we
 *     don't trigger a new filter/API call on every keystroke, and
 *     virtualization (e.g., react-window) if the rendered list itself
 *     is long, so we only render the rows currently visible on screen.
 *
 * Q6: What's a trade-off of using useMemo everywhere "just to be safe"?
 * A6: useMemo itself has a small cost — React has to store the cached
 *     value and compare dependencies on every render. Overusing it on
 *     cheap calculations (e.g., filtering 5 items) can add unnecessary
 *     complexity and memory overhead without any measurable performance
 *     gain. It should be reserved for computations that are actually
 *     expensive or run on large data sets.
 *
 * Q7: Walk me through what happens, step by step, the instant a user
 *     types one character in the search box.
 * A7: The input's onChange fires, calling handleSearch with the new
 *     text. handleSearch calls setSearchText, which updates state and
 *     schedules a re-render. React re-runs the component function; since
 *     searchText changed, useMemo detects the dependency change and
 *     re-executes filter() (and sort(), since it's in the same memoized
 *     block) to produce a new filtered/sorted array. That new array is
 *     mapped into ProductCard elements, and React reconciles them against
 *     the previous DOM using each card's key, updating only what
 *     actually changed on screen.
 */
