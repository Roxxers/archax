

function useAllMyRam() {
  const allocate = () => {
    const size = 128 * 1024 * 1024 // 64MB
    const buffer = Buffer.alloc(size)
    heaps.push(buffer)
    console.log("allocated 128MB")
  }
  let heaps = []
  let i = 0
  const interval = setInterval(() => {
    allocate()
    i += 1
    if (i >= 100) {
      clearInterval(interval)
      console.log("finished taking your RAM")
    }
  }, 50)
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  sleep(100 * 1000)
  heaps = []
  sleep(100 * 1000)
}

useAllMyRam()

