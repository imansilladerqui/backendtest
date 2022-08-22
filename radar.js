const radar = (input) => {
  let response = []

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

  input.protocols.forEach((protocol) => {
    switch (protocol) {
      case 'closest-enemies':
        let globaldistanceClose = 0

        if (input.protocols.length > 1) {
          response.map((scan, index) => {
            if (index === 0) {
              response = [scan]
              globaldistanceClose = scan.x + scan.y
            }

            if (scan.x + scan.y <= globaldistanceClose) {
              response = [scan]
              globaldistanceClose = scan.x + scan.y
            }
          })
        } else {
          input.scan.map((scan, index) => {
            if (index === 0) {
              response = [scan.coordinates]
              globaldistanceClose = scan.coordinates.x + scan.coordinates.y
            }

            if (
              scan.coordinates.x + scan.coordinates.y <=
              globaldistanceClose
            ) {
              response = [scan.coordinates]
              globaldistanceClose = scan.coordinates.x + scan.coordinates.y
            }
          })
        }

        break
      case 'furthest-enemies':
        let globaldistanceFar = 0
        if (input.protocols.length > 1) {
          response.map((scan, index) => {
            if (index === 0) {
              response = [scan]
              globaldistanceFar = scan.x + scan.y
            }

            if (scan.x + scan.y <= globaldistanceFar) {
              response = [scan]
              globaldistanceFar = scan.x + scan.y
            }
          })
        } else {
          input.scan.map((scan, index) => {
            if (index === 0) {
              response = [scan.coordinates]
              globaldistanceFar = scan.coordinates.x + scan.coordinates.y
            }

            if (scan.coordinates.x + scan.coordinates.y > globaldistanceFar) {
              response = [scan.coordinates]
              globaldistanceFar = scan.coordinates.x + scan.coordinates.y
            }
          })
        }

        break
      case 'assist-allies':
        input.scan.map((scan) => {
          if (scan.allies) {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              response.push(scan.coordinates)
            } else {
              response = [scan.coordinates]
            }
          }
        })
        break
      case 'avoid-crossfire':
        input.scan.map((scan) => {
          if (!scan.allies) {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              response.push(scan.coordinates)
            } else {
              response = [scan.coordinates]
            }
          }
        })
        break
      case 'prioritize-mech':
        input.scan.map((scan) => {
          if (scan.enemies.type === 'mech') {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              response.push(scan.coordinates)
            } else {
              response = [scan.coordinates]
            }
          }
        })
        break
      case 'avoid-mech':
        input.scan.map((scan) => {
          if (scan.enemies.type !== 'mech') {
            if (
              input.protocols.includes('closest-enemies') ||
              input.protocols.includes('furthest-enemies')
            ) {
              response.push(scan.coordinates)
            } else {
              response = [scan.coordinates]
            }
          }
        })
        break
    }
  })
  return response
}

module.exports = radar
