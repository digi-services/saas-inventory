export async function GET(request) {
    const inventory = [
      { id: 1, name: "Item 1", quantity: 10 },
      { id: 2, name: "Item 2", quantity: 5 },
    ];
    return new Response(JSON.stringify(inventory), {
      headers: { "Content-Type": "application/json" },
    });
  }