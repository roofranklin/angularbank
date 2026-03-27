import { Routes } from "@angular/router";
import { LoginComponent } from "./main-panel/pages/login/login.component";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { 
        path: '',
        loadComponent: () => import('./main-panel/main-panel.component').then(c => c.MainPanelComponent),
        canActivate: [authGuard],
        children: [
            { 
                path: "dashboard",
                loadComponent: () => import ('./main-panel/pages/dashboard/dashboard.component').then(c => c.DashboardComponent) 
            },
            { 
                path: "transferencia", 
                loadComponent: () => import ('./main-panel/pages/transfer/transfer.component').then(c => c.TransferComponent)
            },
            { 
                path: "emprestimo", 
                loadComponent: () => import ('./main-panel/pages/loan/loan.component').then(c => c.LoanComponent)
            },
            { 
                path: "transacoes", 
                loadComponent: () => import ('./main-panel/pages/transactions/transactions.component').then(c => c.TransactionsComponent)
            },
            { 
                path: "transacoes/criar", 
                loadComponent: () => import ('./main-panel/pages/transactions/components/create-transaction/create-transaction.component').then(c => c.CreateTransactionComponent)
            },
            { 
                path: "transacoes/editar/:id",
                loadComponent: () => import ('./main-panel/pages/transactions/components/create-transaction/create-transaction.component').then(c => c.CreateTransactionComponent)
            },
            {
                path: "perfil",
                loadComponent: () => import ('./main-panel/pages/profile/profile.component').then(c => c.ProfileComponent),
                children: [
                    { 
                        path: "dados", 
                        loadComponent: () => import ('./main-panel/pages/profile/pages/personal-data/personal-data.component').then(c => c.PersonalDataComponent)
                    },
                    { 
                        path: "seguranca", 
                        loadComponent: () => import ('./main-panel/pages/profile/pages/security-data/security-data.component').then(c => c.SecurityDataComponent)
                    },
                    { path: "", redirectTo: "dados", pathMatch: "full" },
                ]
            }
        ],
    },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { 
        path: "**", 
        loadComponent: () => import ('./main-panel/pages/not-found/not-found.component').then(c => c.NotFoundComponent)
    },
]