<?php 

class SearchControllerTest extends \PHPUnit\Framework\TestCase {

    public function testFetchProducts()
    {
        $search = new App\Controller\SearchController();

        $validSearchTerm = "london";
        $invalidSearchTerm = "jh82JKHj9187Qm##~";
        $validResults = $search->fetchProducts($validSearchTerm);
        $invalidResults = $search->fetchProducts($invalidSearchTerm);

        $this->assertIsArray(
            $validResults,
            "Valid search term does not return an array."
        );

        $this->assertArrayHasKey("data", $validResults);

        $this->assertSame($invalidResults, []);
    }

}