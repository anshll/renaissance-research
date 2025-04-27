import Nav from "@/components/nav";
import { Paper, papers } from "../papers";


interface PaperPageProps {
    params: {slug: string}
}

export default function PaperPage({ params }: PaperPageProps) {
   
  const data = papers[Number(params.slug)]

  if (!data) return <p>No data found</p>;

  return (
    <>
    <Nav></Nav>
    <div>
       <h1>{data.title}</h1> 
       <h3>{data.author}</h3>
    </div>
    <div id="rating">
        
    </div>
    </>
  )
}