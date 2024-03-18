import { component$, $,useTask$, useSignal, useStore} from "@builder.io/qwik";
import { Link } from "astro:db"
import { db } from "astro:db"
import { isServer } from '@builder.io/qwik/build';



const links = await db.select().from(Link)


export const Main = component$(()=>{

    const store = useSignal(links)

     useTask$(({track})=>{
      const linkers = track(()=>links)
      const update = ()=>(store.value = linkers)
      isServer
        ? update() 
        : delay(500).then(update);
    })

    

    const deleter = $(async(id:number)=>{

        const res = await fetch(`/api/${id}.json`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
           },
         });
           
       } )

    return (

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-10 gap-5 mt-20 ">

			{links.map((link)=>(
          <div class="flex flex-col gap-3 bg-slate-400 w-[350px] h-[250px] text-white p-5 justify-start" key={link.id}>
          <button onClick$={$(()=>{deleter(link.id)})}>X</button>
          <h5 class="capitalize text-lg">{link.title}</h5>
					<p>{link.description}</p>
					<button class="bg-white p-2 rounded-sm text-slate-400"><a href={link.url}>Open link</a></button>
					<input type="checkbox" bind:value={link.isRead} id="" class=" p-3" />
          </div>
				
			))}

      

		</div>
        
    )
})

const delay = (time: number) => new Promise((res) => setTimeout(res, time));