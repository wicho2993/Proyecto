import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3Page } from './tab3.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

// Mock de AngularFirestore
class MockAngularFirestore {
  collection() {
    return {
      valueChanges: () => of([{
        name: 'Hospital ABC',
        lat: '19.4326',
        lon: '-99.1332'
      }])
    };
  }
}

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
      providers: [
        { provide: AngularFirestore, useClass: MockAngularFirestore }  // Usamos el mock para AngularFirestore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hospitales data', () => {
    // Comprobamos que hospitales$ se haya asignado correctamente
    component.hospitales$.subscribe(data => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toBe('Hospital ABC');
    });
  });
});
