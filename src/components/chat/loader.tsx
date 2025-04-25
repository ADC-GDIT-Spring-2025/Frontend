"use client"

export default function Loader() {
  return (
    <div className="flex items-center">
      <div className="font-bold text-xl relative">
        <span className="thinking-text opacity-50">Thinking...</span>
      </div>

      <style jsx>{`
        .thinking-text {
          background: linear-gradient(
            to right,
            #ffffff,
            #999ca1,
            #999ca1,
            #999ca1,
            #ffffff
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: gradient 3s linear infinite;
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  )
}
