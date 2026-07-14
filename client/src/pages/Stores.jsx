import {getStores, newStore } from "@/api/storeApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import { Plus, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Stores() {
  const {user} = useAuth()
  const isAdmin = user?.role === "admin";
  const [stores,setStores] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [storeData, setStoreData] = useState({
    name:"",
    address:"",
  });
  const [loading, setLoading] = useState(false);
  

  const listStoreFetch = async()=>{
    try {
      setListLoading(true);
      const res = await getStores();
      if(res.data.success){
        setStores(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setListLoading(false);
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      setLoading(true)
      const res = await newStore(storeData);
      console.log(res);
      
      if(res.data.success){
        toast.success(res?.data?.message || "Store Created Successfully");
        setStoreData({
          name:"",
          address:"",
        });
        await listStoreFetch();
        setDialogOpen(false)
      }
      
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{
    listStoreFetch();
  },[])

  //console.log(stores);
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <Store className="w-6 h-6"/>
          Stores
        </h1>
        { isAdmin &&(<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>
              <Plus/>
              New Store
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Create New Store
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input
                type={"text"}
                placeholder="Store Name"
                value={storeData.name}
                onChange={(e)=>{
                  setStoreData({
                    ...storeData,
                    name:e.target.value
                  })
                }}
                required
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                type={"text"}
                placeholder="Address"
                value={storeData.address}
                onChange={(e)=>{
                  setStoreData({
                    ...storeData,
                    address:e.target.value
                  })
                }}
                required
                />
              </div>
              <Button disabled={loading} type='submit' className="w-full">
                {loading ? <Spinner/> :"Create Store"}
              </Button>
            </form>
          </DialogContent>
        </Dialog> )}       
      </div>
      {
        listLoading ? (
          <Spinner/>
        ):(
          <Card className="mt-6">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>address</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {
                    stores?.map((store)=>(
                      <TableRow key={store._id}>
                        <TableCell>{store?.name}</TableCell>
                        <TableCell>{store?.address}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      }
    </div>
  )
}
