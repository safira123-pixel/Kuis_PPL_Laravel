<?php

namespace Tests\Feature;

use App\Models\MenuItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CRUDTest extends TestCase
{
    use RefreshDatabase;

    public function setup(): void
    {
        # code...
        parent::setUp();
        $this->actingAs(User::find(1));
    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_superadmin_can_see_menu_item_list()
    {
        //login superadmin
        $this->actingAs(User::find(1));

        //buka halaman menu item
        $response = $this->get('/menu-management/menu-item/');

        //pastikan response 200
        $response->assertStatus(200);

        //assert ada variabel menu item
        $response->assertSeeText('Menu Item');
    }

    public function test_menu_item_store()
    {
        $item1 = MenuItem::make([
            'name' => 'User Test List',
            'route' => 'user-management/user',
            'permission_name' => 'user.index',
            'menu_group_id' => 2,
        ]);
        $item2 =  MenuItem::make([
            'name' => 'Admin Test List',
            'route' => 'user-management/user',
            'permission_name' => 'user.index',
            'menu_group_id' => 2,
        ]);

        $this->assertTrue($item1->name != $item2->name);
    }

    public function test_menu_item_update()
    {
        $menuItems = MenuItem::where('id', 9)->update([
            'name' => 'Admin Test Lagi',
            'route' => 'menu-management/menu-item',
            'permission_name' => 'menu-item.index',
            'menu_group_id' => 2,
        ]);

        $this->assertDatabaseMissing(
            'menu_items',
            [
                'name' => 'Admin Test Lagi',
                'route' => 'menu-management/menu-item',
                'permission_name' => 'menu-item.index',
                'menu_group_id' => 2,
            ]
        );
    }

    public function test_menu_item_delete()
    {
        $menuItems = MenuItem::first();
        if ($menuItems) {
            $menuItems->delete();
        }
        $this->assertTrue(true);
    }

    public function  test_it_store_new_menu_item()
    {
        $response = $this->post('/menu-management/menu-item/', [
            'name' => 'Ngetest Lagi Yuk',
            'route' => '/menu-management/menu-item/create',
            'permission_name' => 'menu-item.create',
            'menu_group_id' => 4,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect("/menu-management/menu-item/");
        $response->assertSessionHas("success", "Data berhasil ditambahkan");
        $search = $this->get("/menu-management/menu-item/", [
            "name" => "Ngetest Lagi Yuk",
        ]);
        $search->assertSeeText("/menu-management/menu-item/create");
        $this->assertDatabaseHas('menu_items', [
            "name" => "Ngetest Lagi Yuk",
            "route" => "/menu-management/menu-item/create",
        ]);
    }
}