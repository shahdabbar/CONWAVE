<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{

    public function index(Request $request) {
        $address = Address::findOrFail($request->user_id);
        return response()->json($address);
    }

    public function store(Request $request) {

        $data = request()->validate([
            'user_id' => 'required',
            'country' => 'required',
            'area' => 'required',
            'street' => 'required',
            'building' => 'required',
            'floor' => 'required',
            'additional_details' => 'required',

        ]);
      
        $session = Address::updateOrCreate([
            'user_id' => $request->user_id,
            'country' => $request->country,
            'area' => $request->area,
            'street' => $request->street,
            'building' => $request->building,
            'floor' => $request->floor,
            'additional_details' => $request->additional_details,

        ]);

        return response()->json("success");
       
    }
}
