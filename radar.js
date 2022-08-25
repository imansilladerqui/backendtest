const radar = (input) => {
  let response = []
  let loop = []
  let result = []

  if (
    input.protocols.includes('closest-enemies') ||
    input.protocols.includes('furthest-enemies')
  ) {
    if (input.protocols.indexOf('furthest-enemies') === -1) {
      fromIndex = input.protocols.indexOf('closest-enemies')
    } else {
      fromIndex = input.protocols.indexOf('furthest-enemies')
    }
    const toIndex = input.protocols.length - 1
    const element = input.protocols.splice(fromIndex, 1)[0]
    input.protocols.splice(toIndex, 1)
    input.protocols.push(element)
  }

  input.protocols.map((protocol, index) => {
    if (index === 0) {
      loop = input.scan
    } else {
      loop = response
    }

    switch (protocol) {
      case 'closest-enemies':
        let globaldistanceClose = 0
        loop.map((scan, index) => {
          if (index === 0) {
            result = [scan.coordinates]
            globaldistanceClose = scan.coordinates.x + scan.coordinates.y
          }

          if (scan.coordinates.x + scan.coordinates.y <= globaldistanceClose) {
            result = [scan.coordinates]
            globaldistanceClose = scan.coordinates.x + scan.coordinates.y
          }
        })
        return (response = result)
      case 'furthest-enemies':
        let globaldistanceFar = 0
        loop.map((scan, index) => {
          if (index === 0) {
            result = [scan.coordinates]
            globaldistanceFar = scan.coordinates.x + scan.coordinates.y
          }

          if (scan.coordinates.x + scan.coordinates.y > globaldistanceFar) {
            result = [scan.coordinates]
            globaldistanceFar = scan.coordinates.x + scan.coordinates.y
          }
        })
        return (response = result)
      case 'assist-allies':
        result = []
        input.scan.map((scan) => {
          if (scan.allies) {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              result.push(scan)
            } else {
              result = [scan.coordinates]
            }
          }
        })
        return (response = result)
      case 'avoid-crossfire':
        result = []
        loop.map((scan) => {
          if (!scan.allies) {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              result.push(scan)
            } else {
              result = [scan.coordinates]
            }
          }
        })
        return (response = result)
      case 'prioritize-mech':
        result = []
        input.scan.map((scan) => {
          if (scan.enemies.type === 'mech') {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              result.push(scan)
            } else {
              result = [scan.coordinates]
            }
          }
        })
        return (response = result)
      case 'avoid-mech':
        result = []
        input.scan.map((scan) => {
          if (scan.enemies.type !== 'mech') {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              result.push(scan)
            } else {
              result = [scan.coordinates]
            }
          }
        })
        return (response = result)
    }
  })
  return response
}

module.exports = radar
