<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\Extension\Core\Type\SearchType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Validator\Constraints\NotBlank;

class SearchController extends AbstractController
{   
    public array $results = [];

    /**
     * index
     *
     * @param  Request $request
     * @return Response
     */
    #[Route('/search', name: 'app_search')]            
    public function index(Request $request): Response
    {

        $form = $this->createFormBuilder()
            ->add("search", SearchType::class, [
                "label" => false, 
                "attr" => ["placeholder" => "Search"],
                "constraints" => [new NotBlank()]])
            ->add("submit", SubmitType::class, ["label" => "Search"])
            ->getForm();

        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $searchQuery = $data["search"] ?? "";
            $this->results = $this->fetchProducts($searchQuery);
        }

        return $this->render("search/index.html.twig", [
            "form" => $form,
            "request" => $request,
            "results_meta" => $this->results["meta"] ?? [],
            "results" => $this->results["data"] ?? [],
        ]);

    }

    /**
     * fetchProducts
     *
     * @param  mixed $searchQuery
     * @return array
     */
    public function fetchProducts(string $searchQuery = ""): array
    {
        $client = HttpClient::create();
        $response = $client->request(
            "GET",
            "https://global.atdtravel.com/api/products?geo=en&title={$searchQuery}",
        );
        $statusCode = $response->getStatusCode();
        if (200 === $statusCode) {
            return $response->toArray();
        } else if (404 === $statusCode) {
            return [];
        } else {
            throw new \Exception(
                "Product Search Error: {$statusCode}"
            );
        }
    }
}
