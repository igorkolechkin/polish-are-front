export default function Loader() {
  return (
    <div className="flex justify-center items-center bg-white rounded-xl gap-3 absolute top-0 left-0 right-0 bottom-0">
      <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
      <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:0.15s]"></div>
      <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:0.3s]"></div>
    </div>
  )
}