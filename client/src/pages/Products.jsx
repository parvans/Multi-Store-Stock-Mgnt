import {getProducts, newProduct } from "@/api/productApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Products() {
  const [products,setProducts] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [productData, setProductData] = useState({
    name:"",
    sku:"",
  });
  const [loading, setLoading] = useState(false);
  

  const listProductFetch = async()=>{
    try {
      setListLoading(true);
      const res = await getProducts();
      if(res.data.success){
        setProducts(res?.data?.data);
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
      const res = await newProduct(productData);
      console.log(res);
      
      if(res.data.success){
        toast.success(res?.data?.message || "Product Created Successfully");
        setProductData({
          name:"",
          sku:"",
        });
        await listProductFetch();
        setDialogOpen(false)
      }
      
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{
    listProductFetch();
  },[])

  console.log(products);
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <Package className="w-6 h-6"/>
          Products
        </h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>
              <Plus/>
              New Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Create New Product
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                type={"text"}
                placeholder="Product Name"
                value={productData.name}
                onChange={(e)=>{
                  setProductData({
                    ...productData,
                    name:e.target.value
                  })
                }}
                required
                />
              </div>
              <div className="space-y-2">
                <Label>SKU</Label>
                <Input
                type={"text"}
                placeholder="SKU"
                value={productData.sku}
                onChange={(e)=>{
                  setProductData({
                    ...productData,
                    sku:e.target.value
                  })
                }}
                required
                />
              </div>
              <Button disabled={loading} type='submit' className="w-full">
                {loading ? <Spinner/> :"Create Product"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>        
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
                    <TableHead>SKU</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {
                    products?.map((product)=>(
                      <TableRow key={product._id}>
                        <TableCell>{product?.name}</TableCell>
                        <TableCell>{product?.sku}</TableCell>
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
