"use client";

import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Power, ChartCandlestick, Rocket, Check, Grid3X3, List, Filter, Search, Badge} from "lucide-react";
import { useBoards } from "@/lib/hooks/useBoards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DashboardPage() {
    const { user } = useUser();
    const { createBoard, boards, loading, error } = useBoards();
    const [viewMode, setViewMode] = useState<"grid" | "list"> ('grid')
    const handleCreaeteBoard = async () => {
        await createBoard({ title: "New Board"});
            
    }
    if (loading) {
        return <div> <Loader2/><span>Loading your boards...</span></div>;
    }
    if (error) {
        return <div><h2>Error loading boards</h2><p>{error}</p></div>;
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <Navbar/>
            <main className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Welcome back,  {user?.firstName || user?.username}! 
                    </h1>
                    <p className="text-gray-600">
                        {"Here's what's happening with your admin panel today."}
                    </p>
                    <Button className="w-full sm:w-auto" onClick={handleCreaeteBoard}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Create Board
                    </Button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Boards</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{boards.length}</p>
                                </div>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Power className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active Projects</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{boards.length}</p>
                                </div>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-green-600"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">Recent activities</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{boards.filter((board) => {
                                        const updatedAt = new Date(board.updated_at);
                                        const oneWeekAgo = new Date();
                                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                                        return updatedAt >= oneWeekAgo;
                                    }).length}</p>
                                </div>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <ChartCandlestick className="h-5 w-5 sm:h-6 sm:w-6 text-red-300"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                                        <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total tasks</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{boards.length}</p>
                                </div>
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Boards</h2>
                            <p className="text-gray-600">Manage your projects and tasks</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-4 space-x-4 sm:space-y-0">
                            <div className="flex items-center space-x-2 bg-white border p-1 rounded">
                                <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                                    <Grid3X3 />
                                </Button>
                                    <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>
                                    <List/>
                                </Button>
                            </div>
                            <Button variant="outline" size="sm">
                                <Filter/>
                                Filter
                            </Button>
                            <Button onClick={handleCreaeteBoard}>
                                <Plus/>
                                Create Board
                            </Button>
                        </div>
                    </div>
                    <div className="relative mb-4 sm:mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                        <Input id="search" placeholder="Search boards..." className="pl-10"/>
                    </div>
                    <div>
                        {boards.length === 0 ? (
                            <div>No boards yet</div>
                            ) : viewMode === 'grid' ? (
                                <div>{boards.map((board)  => (
                                    <Link href={`/boards/${board.id}`}>
                                        <Card>
                                            <CardHeader>
                                                <div>
                                                    <Badge>New</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription>{board.description}</CardDescription>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))} </div>
                            ) : (
                                <div></div>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}