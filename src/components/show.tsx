import { component$, useSignal,$, type Signal } from "@builder.io/qwik";

export const ShowModal = component$(() => {

    let dialogue = useSignal(false)
    const title = useSignal('gloworld')
    const description = useSignal('top notch provider')
    const url = useSignal('https://www.glo.com')
    const isRead = useSignal(false)

    const fetcher = $(async()=>{
                const res = await fetch("/api/addlink.json", {
                method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title:title.value,
              description:description.value,
              url:url.value,
              isRead:isRead.value,
            }),
          });
          if(res.ok){
            console.log('successful')
          }
        })


    return (
            <div class="flex flex-col absolute p-5 -top-10 z-50 bg-[#9ea7a7ab] w-screen items-center justify-center place-content-center place-items-start mx-auto">
                <div class ="mb-5 font-semibold text-md sticky top-0 z-20">
                    <h1>Dev Links</h1>
                    <button class='bg-white rounded-md p-3' onClick$={() => dialogue.value = !dialogue.value}>Add link</button>
                </div>


              <div class = "">
                {dialogue.value && (
                    <div class = "flex flex-col p-10 bg-slate-400  gap-1">
                           
                            <label htmlFor="">title</label>
                            <input type="text" name="title" id="" class='p-3 rounded-sm'value={title.value} onInput$={$((e)=>{title.value = e.target!.value})} />

                            <label htmlFor="">url</label>
                            <input type="text" name="url" id="" class='p-3 rounded-sm' value={url.value} onInput$={$((e)=>{url.value = e.target!.value})}/>

                            <textarea name="" id="" cols="30" rows="10" class='p-3 rounded-sm' value={description.value} onInput$={$((e)=>{description.value = e.target!.value})}>
                                description
                            </textarea>

                            <label htmlFor="">isRead</label>
                            <input type="checkbox" name="isRead" id="" bind:value={isRead.value} onCheck$={$((e)=>{isRead.value = e.target!.value})} />

                            <button onClick$={$(()=>{ fetcher()})}>
                                Addlink
                            </button>
                           
                    </div>
                )}
              </div>
            </div> 
       
    )
})


