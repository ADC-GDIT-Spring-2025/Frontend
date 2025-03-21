import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, Filter, Pencil } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/styleselect"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_#8B3A2B_0%,_#4A1E1B_50%,_black_100%)] text-white">
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-medium text-[#E8C0BC] opacity-45">Welcome to</h2>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#E8C0BC] opacity-45">EmailMiner.ai</h1>
          </div>
        </div>

        <div className="w-full max-w-6xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="">
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Summarize the key points</h3>
                <p className="text-gray-300 text-sm">from the emails sent by Jeffrey Skilling.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="">
                <h3 className="text-xl text-gray-100 font-semibold mb-2">List all emails exchanged</h3>
                <p className="text-gray-300 text-sm">between Jeffrey Skilling and Andy Fastow.</p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 flex flex-col justify-center h-24 border-gray-500 backdrop-blur-sm hover:bg-black/40 transition-colors">
              <CardContent className="">
                <h3 className="text-xl text-gray-100 font-semibold mb-2">Analyze the sentiment</h3>
                <p className="text-gray-300 text-sm">of emails discussing the stock prices.</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Select>
              <SelectTrigger className="bg-[#C25B50] h-fill hover:bg-[#A04840] border-none">
                <Pencil className="h-5 w-5 mr-2" />
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 relative">
              <Input
                placeholder="Enter a prompt..."
                className="bg-black/30 border-gray-500 h-12 pl-4 text-white placeholder:text-gray-400 w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button size="icon" className="bg-[#C25B50] hover:bg-[#A04840] text-white rounded-full h-12 w-12">
                <ArrowUp size={24} />
              </Button>
              <Button size="icon" className="bg-[#C25B50] hover:bg-[#A04840] text-white rounded-full h-12 w-12">
                <Filter size={24} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

