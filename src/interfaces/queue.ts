export class Queue<T>
{
	private items : T[]  = []

	// Enqueue function 
	enqueue(element : T) 
	{     
		// adding element to the queue 
		this.items.push(element); 
	}

	// Dequeue function 
	dequeue() 
	{
		return this.items.shift(); 
	}

	// isEmpty function 
	isEmpty() 
	{ 
		// Returns true if the queue is empty. 
		return this.items.length === 0; 
	}
	
	
	// Front function 
	front() 
	{ 
		// Returns the Front element of  
		// the queue without removing it.

		return this.isEmpty() ? this.items[0] : undefined; 
	}
}