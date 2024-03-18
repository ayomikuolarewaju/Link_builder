import { column, defineDb, defineTable } from 'astro:db';
const Link  = defineTable({
  columns:{
    id:column.number({primaryKey:true}),
    title:column.text(),
    url:column.text(),
    description:column.text(),
    isRead:column.boolean({default:true})
  }
})
// https://astro.build/db/config
export default defineDb({
  tables: {Link}
});
