export const getCircularReplacer = () => {
  const seen = new WeakSet<object>()
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export function serializeData (data: any): any {
  try {
    // Serialize the data with flatted
    const serializedData = JSON.stringify(data, getCircularReplacer())
    return JSON.parse(serializedData)
  } catch (error) {
    // Handle the circular reference error
    console.error('Circular reference error:', error)
    return {} // Example: Return an empty object
  }
}

export function priceFormatter (price: number, currency : string){
 // Format the price
 return new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: currency
}).format(price)
}


