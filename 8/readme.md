#### 8. Demonstrate a nodejs function that increases the major garbage collection


# How to use
```sh
node --trace-gc index.js
```

## Notes

This one I struggled with since the wording was a little confusing. Unsure if you wanted me to write a memory inefficent funciton that forced memory to be kept longer than needed against the GC or to just call more major garbage collections by having it be exposed. I then struggled to write a funciton that did the former so I am a bit trumped by this one.